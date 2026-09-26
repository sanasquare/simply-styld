import { useState, useEffect } from 'react';
import { Product, CartItem, Order, InquiryMessage, Category } from './types';
import { PRODUCTS, INITIAL_ORDERS, INITIAL_INQUIRIES } from './data/mockData';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { BottomTabBar } from './components/BottomTabBar';
import { Footer } from './components/Footer';
import { QuickToast } from './components/QuickToast';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';

// Auth & Services
import { AuthProvider, useAuth } from './context/AuthContext';
import { productsService } from './services/productsService';
import { ordersService } from './services/ordersService';
import { wishlistService } from './services/wishlistService';
import { inquiriesService } from './services/inquiriesService';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<Category>('All');
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Initial cart with 2 pieces matching Stitch Cart mockup
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Gulzar Embroidered Kurti Set
      selectedColor: 'Warm Ivory',
      selectedSize: 'L',
      quantity: 1,
    },
    {
      product: PRODUCTS[5] || PRODUCTS[0], // Zari Border Cotton Palazzos
      selectedColor: 'Off-White',
      selectedSize: 'L',
      quantity: 1,
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['gulzar-embroidered-chanderi']);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [inquiries, setInquiries] = useState<InquiryMessage[]>(INITIAL_INQUIRIES);

  // UI state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState('check_circle');

  const showToast = (msg: string, icon = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // 1. Initial Load: Fetch products, orders, and inquiries from Supabase / cache
  useEffect(() => {
    productsService.getProducts().then((data) => {
      if (data && data.length > 0) {
        setProducts(data);
        setSelectedProduct(data[0]);
      }
    });

    ordersService.getAllOrders().then((data) => {
      if (data && data.length > 0) {
        setOrders(data);
      }
    });

    inquiriesService.getInquiries().then((data) => {
      if (data && data.length > 0) {
        setInquiries(data);
      }
    });
  }, []);

  // 2. Sync wishlist when user logs in or mounts
  useEffect(() => {
    wishlistService.getUserWishlist(user?.id).then((ids) => {
      setWishlistIds(ids);
    });
  }, [user]);

  // Scroll to top on path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const handleNavigate = (path: string, catFilter?: Category) => {
    if (catFilter) {
      setCategoryFilter(catFilter);
    }
    setCurrentPath(path);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPath('product-detail');
  };

  const handleAddToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });

    showToast(`Added ${product.name} (${size}) to Bag`, 'shopping_bag');
  };

  const handleBuyNow = (product: Product, size: string, color: string, quantity = 1) => {
    handleAddToCart(product, size, color, quantity);
    setCurrentPath('cart');
  };

  const handleToggleWishlist = async (product: Product) => {
    const updated = await wishlistService.toggleWishlistItem(product.id, user?.id);
    setWishlistIds(updated);
    if (updated.includes(product.id)) {
      showToast('Saved to Personal Edit', 'favorite');
    } else {
      showToast('Removed from Saved Pieces', 'favorite_border');
    }
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from shopping bag', 'delete');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = async (orderData: Order) => {
    setOrders((prev) => [orderData, ...prev]);
    showToast(`Order #${orderData.id} placed successfully!`, 'verified');

    // Create order in Supabase
    await ordersService.createOrder({
      orderRef: orderData.id,
      userId: user?.id || null,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: {
        street: orderData.address,
        city: orderData.city,
        state: 'India',
        pincode: '400052',
      },
      items: cart,
      subtotal: orderData.subtotal,
      discount: orderData.discount,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
    });
  };

  const handleSendMessage = async (msg: { name: string; email: string; phone: string; subject: string; message: string }) => {
    const newInq: InquiryMessage = {
      id: `inq-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      subject: msg.subject,
      message: msg.message,
      timeAgo: 'Just now',
      status: 'Unread',
    };
    setInquiries((prev) => [newInq, ...prev]);
    showToast('Your note has been dispatched to our stylists', 'send');

    await inquiriesService.sendInquiry(msg);
  };

  const handleAddProduct = async (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`New garment "${newProduct.name}" published to catalog`, 'checkroom');

    await productsService.createProduct(newProduct);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order #${orderId} marked as ${newStatus}`, 'local_shipping');

    await ordersService.updateOrderStatus(orderId, newStatus);
  };

  // Derive dynamic page title for Header
  const getPageTitle = () => {
    switch (currentPath) {
      case 'shop':
        return 'CATALOG';
      case 'collections':
        return 'EDITS';
      case 'product-detail':
        return 'PRODUCT DETAIL';
      case 'size-guide':
        return 'SIZE GUIDE';
      case 'about':
        return 'ABOUT';
      case 'contact':
        return 'CONTACT';
      case 'cart':
        return 'BAG';
      case 'wishlist':
        return 'SAVED';
      case 'admin':
        return 'ATELIER ADMIN';
      default:
        return 'SIMPLY STYLD';
    }
  };

  return (
    <div className="min-h-screen bg-[#fef9f0] text-[#1d1c16] flex flex-col font-sans selection:bg-[#fedaa4]">
      
      {/* Toast Notification */}
      <QuickToast message={toastMessage} icon={toastIcon} />

      {/* Supabase Customer Auth Modal */}
      <AuthModal />

      {/* Navigation Drawer (Slide-out menu) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
        currentPath={currentPath}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Persistent Boutique Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        pageTitle={getPageTitle()}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1 pt-16">
        {currentPath === 'home' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPath === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={categoryFilter}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPath === 'collections' && (
          <CollectionsPage
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPath === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => handleNavigate('shop')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenSizeGuide={() => handleNavigate('size-guide')}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPath === 'size-guide' && <SizeGuidePage />}

        {currentPath === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPath === 'contact' && <ContactPage onSendMessage={handleSendMessage} />}

        {currentPath === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {currentPath === 'wishlist' && (
          <WishlistPage
            products={products}
            wishlistIds={wishlistIds}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
          />
        )}

        {currentPath === 'admin' && (
          <AdminPage
            products={products}
            orders={orders}
            inquiries={inquiries}
            onAddProduct={handleAddProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onNavigateToStore={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Footer (shown on all customer-facing pages) */}
      {currentPath !== 'admin' && <Footer onNavigate={handleNavigate} />}

      {/* Sticky Bottom Tab Bar on mobile */}
      {currentPath !== 'admin' && (
        <BottomTabBar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlistIds.length}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
