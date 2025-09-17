import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Badge } from "./components/ui/badge";
import { Switch } from "./components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Separator } from "./components/ui/separator";
import { Checkbox } from "./components/ui/checkbox";
import { Textarea } from "./components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { 
  Sun, 
  Moon, 
  Home, 
  MessageCircle, 
  BarChart3, 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  Lightbulb,
  Menu,
  X,
  Send,
  Bot,
  User,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  BellOff,
  Banknote,
  Building2,
  LogOut,
  Camera,
  ChevronRight,
  Shield,
  Link,
  UserCircle,
  Mail,
  Lock,
  Plus,
  Upload,
  Download,
  FileText,
  PieChart,
  Calendar as CalendarIcon,
  DollarSign,
  Share2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Головна');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привіт! Я FOPilot, ваш помічник з питань ведення бізнесу та податків для ФОП. Як можу допомогти?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Analytics state
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  
  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [bankIntegration, setBankIntegration] = useState(false);
  const [taxIntegration, setTaxIntegration] = useState(true);
  const [userProfile] = useState({
    name: 'Олександр Петренко',
    email: 'oleksandr.petrenko@example.com',
    avatar: ''
  });

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoginScreen, setIsLoginScreen] = useState(false);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Registration state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // New Receipt state
  const [showNewReceipt, setShowNewReceipt] = useState(false);
  const [receiptAmount, setReceiptAmount] = useState('');
  const [receiptCategory, setReceiptCategory] = useState('');
  const [receiptDate, setReceiptDate] = useState('');
  const [receiptDescription, setReceiptDescription] = useState('');

  // Report state
  const [showReport, setShowReport] = useState(false);
  const [reportPeriod, setReportPeriod] = useState('month');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleMenuItemClick = (itemName: string) => {
    setActiveMenuItem(itemName);
    
    // Закриваємо спеціальні екрани при переході на інші сторінки
    if (itemName !== 'Новий чек') {
      setShowNewReceipt(false);
    }
    if (itemName !== 'Звіт') {
      setShowReport(false);
    }
    
    // Закриваємо меню на малих екранах після вибору пункту
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Симуляція відповіді AI
    setTimeout(() => {
      const aiResponses = [
        "Для реєстрації ФОП вам потрібно подати заяву до податкової служби. Можу детальніше розповісти про процедуру.",
        "Ставка єдиного податку залежить від групи ФОП. Перша група - до 5% прожиткового мінімуму, друга - до 20%, третя - до 5% від доходу.",
        "Книгу обліку доходів та витрат потрібно вести щоденно. Записуйте всі операції з документальним підтвердженням.",
        "Звітність подається до 20 числа наступного місяця. Не забувайте про своєчасну подачу декларації.",
        "Рекомендую відкрити окремий рахунок для бізнесу та вести детальний облік усіх операцій."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const menuItems = [
    { name: 'Головна', icon: Home },
    { name: 'Чат', icon: MessageCircle },
    { name: 'Аналітика', icon: BarChart3 },
    { name: 'Налаштування', icon: Settings }
  ];

  const stats = [
    {
      title: 'Дохід',
      value: '₴45,230',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Витрати',
      value: '₴28,890',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Податки',
      value: '₴3,245',
      change: '-2.1%',
      trend: 'down',
      icon: Receipt,
      color: 'text-blue-600'
    }
  ];

  const tips = [
    "Розгляньте можливість відкриття рахунку ФОП у банку з низькими комісіями",
    "Пам'ятайте про щомісячну звітність до 20 числа наступного місяця",
    "Ведіть детальний облік доходів та витрат для оптимізації податків",
    "Рекомендуємо створити резервний фонд на випадок непередбачених витрат"
  ];

  // Analytics data
  const categories = [
    { id: 'all', name: 'Усі категорії', color: 'bg-blue-500' },
    { id: 'services', name: 'Послуги', color: 'bg-green-500' },
    { id: 'products', name: 'Товари', color: 'bg-purple-500' },
    { id: 'consulting', name: 'Консультації', color: 'bg-orange-500' },
    { id: 'other', name: 'Інше', color: 'bg-gray-500' }
  ];

  const getChartData = () => {
    if (timePeriod === 'week') {
      return [
        { name: 'Пн', income: 4000, expenses: 2400 },
        { name: 'Вт', income: 3000, expenses: 1398 },
        { name: 'Ср', income: 2000, expenses: 1800 },
        { name: 'Чт', income: 2780, expenses: 1908 },
        { name: 'Пт', income: 1890, expenses: 800 },
        { name: 'Сб', income: 2390, expenses: 1200 },
        { name: 'Нд', income: 3490, expenses: 1300 }
      ];
    } else if (timePeriod === 'month') {
      return [
        { name: 'Тиж 1', income: 15000, expenses: 8000 },
        { name: 'Тиж 2', income: 18000, expenses: 9500 },
        { name: 'Тиж 3', income: 22000, expenses: 11000 },
        { name: 'Тиж 4', income: 19000, expenses: 8500 }
      ];
    } else {
      return [
        { name: 'Січ', income: 45000, expenses: 28000 },
        { name: 'Лют', income: 52000, expenses: 31000 },
        { name: 'Бер', income: 48000, expenses: 29000 },
        { name: 'Кві', income: 61000, expenses: 35000 },
        { name: 'Тра', income: 55000, expenses: 33000 },
        { name: 'Чер', income: 67000, expenses: 38000 },
        { name: 'Лип', income: 59000, expenses: 34000 },
        { name: 'Сер', income: 63000, expenses: 36000 },
        { name: 'Вер', income: 58000, expenses: 33000 },
        { name: 'Жов', income: 65000, expenses: 37000 },
        { name: 'Лис', income: 70000, expenses: 39000 },
        { name: 'Гру', income: 72000, expenses: 41000 }
      ];
    }
  };

  const analyticsStats = [
    {
      title: 'Загальний дохід',
      value: '₴182,450',
      change: '+15.2%',
      trend: 'up',
      icon: ArrowUpRight,
      color: 'text-green-600'
    },
    {
      title: 'Загальні витрати',
      value: '₴98,230',
      change: '+8.7%',
      trend: 'up',
      icon: ArrowUpRight,
      color: 'text-red-600'
    },
    {
      title: 'Тенденція',
      value: '₴84,220',
      change: '+23.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    }
  ];

  const toggleCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories.filter(id => id !== 'all'), categoryId];
      
      setSelectedCategories(newCategories.length === 0 ? ['all'] : newCategories);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLoginScreen(true);
    setActiveMenuItem('Головна');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsAuthenticated(true);
      setIsLoginScreen(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerName && registerEmail && registerPassword && registerPasswordConfirm && agreeTerms) {
      if (registerPassword === registerPasswordConfirm) {
        setIsAuthenticated(true);
        setIsRegisterScreen(false);
        setIsLoginScreen(false);
        // Clear form
        setRegisterName('');
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterPasswordConfirm('');
        setAgreeTerms(false);
      } else {
        alert('Паролі не співпадають!');
      }
    }
  };

  const showLoginScreen = () => {
    setIsLoginScreen(true);
    setIsRegisterScreen(false);
  };

  const showRegisterScreen = () => {
    setIsRegisterScreen(true);
    setIsLoginScreen(false);
  };

  const handleShowNewReceipt = () => {
    setShowNewReceipt(true);
    setActiveMenuItem('Новий чек');
  };

  const handleShowReport = () => {
    setShowReport(true);
    setActiveMenuItem('Звіт');
  };

  const handleSaveReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiptAmount && receiptCategory && receiptDate) {
      // Симуляція збереження чека
      alert(`Чек збережено!\nСума: ${receiptAmount} ₴\nКатегорія: ${receiptCategory}\nДата: ${receiptDate}`);
      
      // Очистити форму
      setReceiptAmount('');
      setReceiptCategory('');
      setReceiptDate('');
      setReceiptDescription('');
      
      // Повернутися на головну
      setShowNewReceipt(false);
      setActiveMenuItem('Головна');
    }
  };

  const handlePhotoUpload = () => {
    // Симуляція завантаження фото
    alert('Функція завантаження фото буде додана в майбутньому оновленні');
  };

  const handleExportPDF = () => {
    // Симуляція експорту PDF
    alert('Звіт експортовано у PDF');
  };

  // Show auth screens if not authenticated or explicitly requested
  if (!isAuthenticated || isLoginScreen || isRegisterScreen) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Theme Toggle for Login Screen */}
        <Button
          onClick={toggleTheme}
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 rounded-full w-10 h-10"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Auth Card */}
        <Card className="w-full max-w-md border-border">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
              <h1 className="text-2xl text-primary-foreground">FO</h1>
            </div>
            <h2 className="text-foreground">
              {isRegisterScreen ? 'Створіть акаунт, щоб розпочати' : 'Ласкаво просимо до FOPilot'}
            </h2>
            <p className="text-muted-foreground">
              {isRegisterScreen ? 'Приєднуйтесь до тисяч успішних ФОП' : 'Ваш надійний помічник у веденні бізнесу'}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isRegisterScreen ? (
              /* Registration Form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Ім'я / Назва ФОП"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="h-12 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Електронна пошта"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="h-12 rounded-lg border-2"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Пароль"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="h-12 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Підтвердження пароля"
                    value={registerPasswordConfirm}
                    onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                    className="h-12 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-muted-foreground leading-none">
                    Я погоджуюся з{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      умовами використання
                    </Button>
                  </label>
                </div>

                <div className="space-y-3 pt-2">
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-lg"
                    disabled={!registerName || !registerEmail || !registerPassword || !registerPasswordConfirm || !agreeTerms}
                  >
                    Зареєструватися
                  </Button>
                </div>
              </form>
            ) : (
              /* Login Form */
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Електронна пошта"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-12 rounded-lg border-2"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Пароль"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-12 rounded-lg border-2"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-12 rounded-lg"
                    disabled={!loginEmail || !loginPassword}
                  >
                    Увійти
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-12 rounded-lg"
                    onClick={showRegisterScreen}
                  >
                    Зареєструватися
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center pt-4">
              {isRegisterScreen ? (
                <Button variant="link" className="text-muted-foreground" onClick={showLoginScreen}>
                  У мене вже є акаунт
                </Button>
              ) : (
                <Button variant="link" className="text-muted-foreground">
                  Забули пароль?
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary">FOPilot</h1>
              <p className="text-muted-foreground">Ваш помічник у бізнесі</p>
            </div>
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={closeSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={activeMenuItem === item.name ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => handleMenuItemClick(item.name)}
                >
                  <IconComponent className="h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-foreground">
                {activeMenuItem === 'Чат' ? 'Запитай FOPilot' : 
                 activeMenuItem === 'Аналітика' ? 'Аналітика' : 
                 activeMenuItem === 'Налаштування' ? 'Налаштування' : 
                 activeMenuItem === 'Новий чек' ? 'Новий чек' :
                 activeMenuItem === 'Звіт' ? 'Звіт за місяць' : 'Головна панель'}
              </h2>
              <p className="text-muted-foreground">
                {activeMenuItem === 'Чат' ? 'Ваш AI помічник з питань бізнесу' : 
                 activeMenuItem === 'Аналітика' ? 'Детальний аналіз ваших фінансів' : 
                 activeMenuItem === 'Налаштування' ? 'Керування профілем та інтеграціями' : 
                 activeMenuItem === 'Новий чек' ? 'Додати нову транзакцію до обліку' :
                 activeMenuItem === 'Звіт' ? 'Фінансовий звіт з основними показниками' : 'Огляд ваших фінансів'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* User Greeting */}
            <p className="text-muted-foreground hidden sm:block">
              Привіт, {userProfile.name.split(' ')[0]}!
            </p>
            
            {/* User Avatar/Login Button */}
            <Button
              onClick={showLoginScreen}
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback>
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Button>

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {showNewReceipt || activeMenuItem === 'Новий чек' ? (
            /* New Receipt Content */
            <div className="flex-1 p-4 md:p-6 max-w-2xl mx-auto w-full">
              <form onSubmit={handleSaveReceipt} className="space-y-6">
                {/* Amount Field */}
                <Card className="border-border">
                  <CardContent className="p-6">
                    <label className="block text-foreground mb-3">Сума *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={receiptAmount}
                        onChange={(e) => setReceiptAmount(e.target.value)}
                        className="pl-10 h-14 text-lg rounded-xl"
                        required
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₴</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Field */}
                <Card className="border-border">
                  <CardContent className="p-6">
                    <label className="block text-foreground mb-3">Категорія *</label>
                    <Select value={receiptCategory} onValueChange={setReceiptCategory} required>
                      <SelectTrigger className="h-14 text-lg rounded-xl">
                        <SelectValue placeholder="Оберіть категорію" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">💰 Доходи</SelectItem>
                        <SelectItem value="rent">🏢 Оренда</SelectItem>
                        <SelectItem value="advertising">📢 Реклама</SelectItem>
                        <SelectItem value="transport">🚗 Транспорт</SelectItem>
                        <SelectItem value="equipment">💻 Обладнання</SelectItem>
                        <SelectItem value="supplies">📦 Матеріали</SelectItem>
                        <SelectItem value="other">📋 Інше</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Date Field */}
                <Card className="border-border">
                  <CardContent className="p-6">
                    <label className="block text-foreground mb-3">Дата *</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="date"
                        value={receiptDate}
                        onChange={(e) => setReceiptDate(e.target.value)}
                        className="pl-10 h-14 rounded-xl"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Description Field */}
                <Card className="border-border">
                  <CardContent className="p-6">
                    <label className="block text-foreground mb-3">Опис</label>
                    <Textarea
                      placeholder="Додатковий опис транзакції..."
                      value={receiptDescription}
                      onChange={(e) => setReceiptDescription(e.target.value)}
                      className="min-h-[100px] rounded-xl"
                    />
                  </CardContent>
                </Card>

                {/* Photo Upload */}
                <Card className="border-border border-dashed">
                  <CardContent className="p-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePhotoUpload}
                      className="w-full h-20 rounded-xl border-dashed"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                        <span className="text-muted-foreground">Завантажити фото чека</span>
                      </div>
                    </Button>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowNewReceipt(false);
                      setActiveMenuItem('Головна');
                    }}
                    className="flex-1 h-14 rounded-xl"
                  >
                    Скасувати
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-14 rounded-xl"
                    disabled={!receiptAmount || !receiptCategory || !receiptDate}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Додати
                  </Button>
                </div>
              </form>
            </div>
          ) : showReport || activeMenuItem === 'Звіт' ? (
            /* Report Content */
            <div className="flex-1 p-6 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
              {/* Report Header */}
              <div className="text-center space-y-4 pb-8 border-b border-border">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl text-foreground mb-2">
                    Звіт за {reportPeriod === 'month' ? 'місяць' : reportPeriod === 'quarter' ? 'квартал' : 'рік'}
                  </h1>
                  <p className="text-muted-foreground">ФОП {userProfile.name}</p>
                  <p className="text-muted-foreground">Згенеровано: {new Date().toLocaleDateString('uk-UA')}</p>
                </div>
                
                {/* Period Selector */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Місяць</SelectItem>
                      <SelectItem value="quarter">Квартал</SelectItem>
                      <SelectItem value="year">Рік</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                  <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-muted-foreground mb-2">Загальний дохід</h3>
                  <p className="text-4xl text-green-600 mb-2">₴182,450</p>
                  <p className="text-muted-foreground">+15.2% до попереднього періоду</p>
                </div>

                <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
                  <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-center justify-center mb-4">
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-muted-foreground mb-2">Загальні витрати</h3>
                  <p className="text-4xl text-red-600 mb-2">₴98,230</p>
                  <p className="text-muted-foreground">+8.7% до попереднього періоду</p>
                </div>

                <div className="text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-muted-foreground mb-2">Чистий прибуток</h3>
                  <p className="text-4xl text-blue-600 mb-2">₴84,220</p>
                  <p className="text-muted-foreground">+23.1% до попереднього періоду</p>
                </div>
              </div>

              {/* Transactions Table */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-foreground text-xl">Детальний перелік операцій</h3>
                  <p className="text-muted-foreground">Усі доходи та витрати за обраний період</p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Дата</TableHead>
                        <TableHead>Категорія</TableHead>
                        <TableHead>Опис</TableHead>
                        <TableHead className="text-right">Сума</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { date: '2024-12-01', category: '💰 Доходи', description: 'Оплата послуг веб-розробки', amount: 25000, type: 'income' },
                        { date: '2024-12-02', category: '🏢 Оренда', description: 'Оренда офісу за грудень', amount: -12000, type: 'expense' },
                        { date: '2024-12-03', category: '💰 Доходи', description: 'Консультація з дизайну', amount: 8500, type: 'income' },
                        { date: '2024-12-04', category: '📢 Реклама', description: 'Google Ads кампанія', amount: -3200, type: 'expense' },
                        { date: '2024-12-05', category: '💰 Доходи', description: 'Підтримка сайту', amount: 15000, type: 'income' },
                        { date: '2024-12-06', category: '🚗 Транспорт', description: 'Паливо та проїзд', amount: -2800, type: 'expense' },
                        { date: '2024-12-07', category: '💻 Обладнання', description: 'Новий ноутбук', amount: -45000, type: 'expense' },
                        { date: '2024-12-08', category: '💰 Доходи', description: 'Розробка мобільного застосунку', amount: 55000, type: 'income' },
                        { date: '2024-12-09', category: '📦 Матеріали', description: 'Канцелярські товари', amount: -1200, type: 'expense' },
                        { date: '2024-12-10', category: '💰 Доходи', description: 'SEO оптимізація сайту', amount: 18000, type: 'income' }
                      ].map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString('uk-UA')}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className={`text-right ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : ''}₴{Math.abs(transaction.amount).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 border-t border-border">
                <Button onClick={handleExportPDF} className="gap-2 px-8 py-3">
                  <Download className="h-4 w-4" />
                  Експортувати у PDF
                </Button>
                <Button variant="outline" className="gap-2 px-8 py-3">
                  <Share2 className="h-4 w-4" />
                  Поділитися звітом
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowReport(false);
                    setActiveMenuItem('Головна');
                  }}
                  className="px-8 py-3"
                >
                  Повернутися на головну
                </Button>
              </div>
            </div>
          ) : activeMenuItem === 'Налаштування' ? (
            /* Settings Content */
            <div className="flex-1 p-4 md:p-6 space-y-6 max-w-4xl mx-auto w-full">
              {/* Profile Section */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-foreground">Профіль</h3>
                  <p className="text-muted-foreground">Керування профілем користувача</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback className="text-lg">
                          {userProfile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="icon" 
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                        variant="secondary"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground">{userProfile.name}</h4>
                      <p className="text-muted-foreground">{userProfile.email}</p>
                      <p className="text-muted-foreground">ФОП • 3 група</p>
                    </div>
                    <Button variant="outline">
                      Редагувати профіль
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-foreground">Оформлення</h3>
                  <p className="text-muted-foreground">Налаштування теми інтерфейсу</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      <div>
                        <p className="text-foreground">Темна тема</p>
                        <p className="text-muted-foreground">
                          {isDark ? 'Увімкнено темний режим' : 'Увімкнено світлий режим'}
                        </p>
                      </div>
                    </div>
                    <Switch checked={isDark} onCheckedChange={setIsDark} />
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-foreground">Сповіщення</h3>
                  <p className="text-muted-foreground">Керування сповіщеннями та оповіщеннями</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {notifications ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
                      <div>
                        <p className="text-foreground">Push сповіщення</p>
                        <p className="text-muted-foreground">Отримувати сповіщення в браузері</p>
                      </div>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5" />
                      <div>
                        <p className="text-foreground">Email сповіщення</p>
                        <p className="text-muted-foreground">Отримувати сповіщення на пошту</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                </CardContent>
              </Card>

              {/* Integrations */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-foreground">Інтеграції</h3>
                  <p className="text-muted-foreground">Підключення зовнішніх сервісів</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                        <Banknote className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-foreground">Банківська інтеграція</p>
                        <p className="text-muted-foreground">
                          {bankIntegration ? 'Підключено до ПриватБанку' : 'Підключіть ваш банк'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {bankIntegration && (
                        <Badge variant="secondary" className="text-green-600">
                          Активно
                        </Badge>
                      )}
                      <Button 
                        variant={bankIntegration ? "outline" : "default"}
                        onClick={() => setBankIntegration(!bankIntegration)}
                      >
                        {bankIntegration ? 'Налаштувати' : 'Підключити'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-foreground">Податкова інтеграція</p>
                        <p className="text-muted-foreground">
                          {taxIntegration ? 'Підключено до ДПС України' : 'Підключіть податкову'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {taxIntegration && (
                        <Badge variant="secondary" className="text-blue-600">
                          Активно
                        </Badge>
                      )}
                      <Button 
                        variant={taxIntegration ? "outline" : "default"}
                        onClick={() => setTaxIntegration(!taxIntegration)}
                      >
                        {taxIntegration ? 'Налаштувати' : 'Підключити'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Privacy */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-foreground">Безпека</h3>
                  <p className="text-muted-foreground">Налаштування безпеки та приватності</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5" />
                      <span>Змінити пароль</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-3">
                      <Link className="h-5 w-5" />
                      <span>Підключені сесії</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Logout */}
              <Card className="border-border border-red-200 dark:border-red-800">
                <CardContent className="p-6">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Вийти з системи
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : activeMenuItem === 'Аналітика' ? (
            /* Analytics Content */
            <div className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-border bg-gradient-to-br from-card to-card/80">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-muted-foreground">Дохід</p>
                        <h3 className="text-3xl text-foreground">₴182,450</h3>
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          <span>+15.2%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-gradient-to-br from-card to-card/80">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-muted-foreground">Витрати</p>
                        <h3 className="text-3xl text-foreground">₴98,230</h3>
                        <div className="flex items-center gap-1 text-red-600">
                          <TrendingUp className="h-4 w-4" />
                          <span>+8.7%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30">
                        <TrendingDown className="h-8 w-8 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-gradient-to-br from-card to-card/80">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-muted-foreground">Прибуток</p>
                        <h3 className="text-3xl text-foreground">₴84,220</h3>
                        <div className="flex items-center gap-1 text-blue-600">
                          <TrendingUp className="h-4 w-4" />
                          <span>+23.1%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                        <DollarSign className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Controls */}
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                {/* Period Selector */}
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
                    {['week', 'month', 'year'].map((period) => (
                      <Button
                        key={period}
                        variant={timePeriod === period ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setTimePeriod(period)}
                        className="px-4"
                      >
                        {period === 'week' ? 'Тиждень' : period === 'month' ? 'Місяць' : 'Рік'}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-3">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Chart */}
              <Card className="border-border">
                <CardHeader className="pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground text-2xl">Дохід vs Витрати</h3>
                      <p className="text-muted-foreground">Фінансова динаміка за обраний період</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--chart-1))'}} />
                        <span className="text-muted-foreground">Дохід</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--chart-2))'}} />
                        <span className="text-muted-foreground">Витрати</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="name" 
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '12px',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="income" 
                        fill="hsl(var(--chart-1))" 
                        name="Дохід"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="expenses" 
                        fill="hsl(var(--chart-2))" 
                        name="Витрати"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-foreground text-xl">Розбивка за категоріями</h3>
                  <p className="text-muted-foreground">Детальний аналіз витрат</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.slice(1).map((category, index) => {
                      const amount = Math.floor(Math.random() * 40000 + 10000);
                      const percent = Math.floor(Math.random() * 25 + 5);
                      return (
                        <div key={category.id} className="p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <div className={`w-4 h-4 rounded-full ${category.color}`} />
                            <Badge variant="secondary">{percent}%</Badge>
                          </div>
                          <h4 className="text-foreground mb-1">{category.name}</h4>
                          <p className="text-muted-foreground text-2xl">₴{amount.toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : activeMenuItem === 'Чат' ? (
            /* Chat Content */
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div className={`max-w-[70%] ${message.isUser ? 'order-first' : ''}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground rounded-br-md'
                            : 'bg-muted text-foreground rounded-bl-md'
                        }`}
                      >
                        <p className="leading-relaxed">{message.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-2">
                        {message.timestamp.toLocaleTimeString('uk-UA', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>

                    {message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-border p-4 md:p-6">
                <div className="flex gap-3 items-end max-w-4xl mx-auto">
                  <div className="flex-1">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Напишіть запитання..."
                      className="min-h-[50px] rounded-2xl border-2 resize-none px-4 py-3"
                      disabled={isTyping}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    size="icon"
                    className="h-[50px] w-[50px] rounded-2xl"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Dashboard Content */
            <div className="flex-1 p-4 md:p-6 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card key={stat.title} className="border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-muted-foreground">{stat.title}</p>
                            <h3 className="text-foreground mt-1">{stat.value}</h3>
                            <div className={`flex items-center gap-1 mt-2 ${stat.color}`}>
                              <IconComponent className="h-4 w-4" />
                              <span>{stat.change}</span>
                            </div>
                          </div>
                          <div className={`p-3 rounded-lg bg-accent ${stat.color}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Tips Section */}
              <Card className="border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    <h3 className="text-foreground">Поради від FOPilot</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tips.map((tip, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleShowNewReceipt}
                  className="h-16 flex flex-col gap-2"
                >
                  <Receipt className="h-5 w-5" />
                  <span>Новий чек</span>
                </Button>
                <Button 
                  onClick={handleShowReport}
                  variant="outline" 
                  className="h-16 flex flex-col gap-2"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Звіт</span>
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}