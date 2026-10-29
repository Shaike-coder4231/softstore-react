export const API_BASE = 'https://dummyjson.com';

export const CATEGORIES = [
  { key: 'os',        name: 'Операционные системы',  icon: '🖥️' },
  { key: 'office',    name: 'Офисные пакеты',        icon: '📊' },
  { key: 'antivirus', name: 'Антивирусы и защита',   icon: '🛡️' },
  { key: 'graphics',  name: 'Графика и дизайн',      icon: '🎨' },
  { key: 'dev',       name: 'Разработка и IDE',      icon: '💻' },
  { key: 'cloud',     name: 'Облачные сервисы',      icon: '☁️' },
  { key: 'utility',   name: 'Утилиты и плагины',     icon: '🔧' },
  { key: 'database',  name: 'Базы данных и серверы', icon: '🗄️' },
];

export const LICENSE_MULT = { Personal: 1, Business: 2.4, Enterprise: 5.8 };

const RAW_PRODUCTS = [
  { id:1,  title:'Windows 11 Pro', brand:'Microsoft', category:'os', price:199, rating:4.8, stock:999,
    description:'Профессиональная ОС для бизнеса и разработки. BitLocker, Hyper-V, Remote Desktop.',
    licenseTypes:['Personal','Business','Enterprise'], term:'бессрочная' },
  { id:2,  title:'Windows 11 Home', brand:'Microsoft', category:'os', price:139, rating:4.6, stock:999,
    description:'Домашняя версия Windows 11 для личного использования.',
    licenseTypes:['Personal'], term:'бессрочная' },
  { id:3,  title:'Windows Server 2022 Standard', brand:'Microsoft', category:'os', price:1069, rating:4.7, stock:500,
    description:'Серверная ОС для виртуализации и контейнеров.',
    licenseTypes:['Business','Enterprise'], term:'бессрочная' },
  { id:4,  title:'Ubuntu Pro', brand:'Canonical', category:'os', price:25, rating:4.5, stock:999,
    description:'Расширенная поддержка Ubuntu LTS: 10 лет патчей.',
    licenseTypes:['Personal','Business','Enterprise'], term:'1 год' },
  { id:5,  title:'macOS Server', brand:'Apple', category:'os', price:19.99, rating:4.0, stock:100,
    description:'Серверные надстройки для macOS.',
    licenseTypes:['Personal','Business'], term:'бессрочная' },

  { id:10, title:'Microsoft 365 Personal', brand:'Microsoft', category:'office', price:69.99, rating:4.7, stock:999,
    description:'Word, Excel, PowerPoint, Outlook для 1 пользователя на 5 устройствах.',
    licenseTypes:['Personal'], term:'1 год' },
  { id:11, title:'Microsoft 365 Business Standard', brand:'Microsoft', category:'office', price:149, rating:4.8, stock:999,
    description:'Офисные приложения + Exchange + Teams для команды.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:12, title:'LibreOffice Pro Support', brand:'The Document Foundation', category:'office', price:35, rating:4.3, stock:999,
    description:'Свободный офисный пакет + поддержка.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:13, title:'WPS Office Premium', brand:'Kingsoft', category:'office', price:29.99, rating:4.2, stock:999,
    description:'Лёгкий офисный пакет с поддержкой PDF, DOCX, XLSX.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:14, title:'Microsoft Project Professional', brand:'Microsoft', category:'office', price:559, rating:4.6, stock:200,
    description:'Управление проектами, диаграммы Ганта, отчёты.',
    licenseTypes:['Business','Enterprise'], term:'бессрочная' },

  { id:20, title:'Kaspersky Total Security', brand:'Kaspersky', category:'antivirus', price:49.99, rating:4.6, stock:999,
    description:'Защита до 5 устройств: антивирус, файрвол, платежи.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:21, title:'Kaspersky Endpoint Security', brand:'Kaspersky', category:'antivirus', price:89, rating:4.5, stock:500,
    description:'Корпоративная защита конечных точек.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:22, title:'ESET NOD32 Internet Security', brand:'ESET', category:'antivirus', price:39.99, rating:4.5, stock:999,
    description:'Антивирус и файрвол для 3 устройств.',
    licenseTypes:['Personal'], term:'1 год' },
  { id:23, title:'Bitdefender GravityZone', brand:'Bitdefender', category:'antivirus', price:129, rating:4.7, stock:500,
    description:'Корпоративная платформа безопасности.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:24, title:'Malwarebytes Premium', brand:'Malwarebytes', category:'antivirus', price:29.99, rating:4.4, stock:999,
    description:'Антивирус + анти-эксплойт для 1 устройства.',
    licenseTypes:['Personal'], term:'1 год' },

  { id:30, title:'Adobe Photoshop', brand:'Adobe', category:'graphics', price:239, rating:4.8, stock:999,
    description:'Растровая графика, ретушь, композитинг.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:31, title:'Adobe Creative Cloud', brand:'Adobe', category:'graphics', price:599, rating:4.9, stock:999,
    description:'20+ приложений Adobe для дизайна и видео.',
    licenseTypes:['Personal','Business','Enterprise'], term:'1 год' },
  { id:32, title:'Figma Professional', brand:'Figma', category:'graphics', price:144, rating:4.8, stock:999,
    description:'UI/UX-дизайн в браузере. Командная работа.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:33, title:'Affinity Designer', brand:'Serif', category:'graphics', price:69.99, rating:4.6, stock:999,
    description:'Векторный редактор с бессрочной лицензией.',
    licenseTypes:['Personal','Business'], term:'бессрочная' },
  { id:34, title:'CorelDRAW Graphics Suite', brand:'Corel', category:'graphics', price:499, rating:4.4, stock:300,
    description:'Пакет для векторной графики и вёрстки.',
    licenseTypes:['Personal','Business','Enterprise'], term:'бессрочная' },

  { id:40, title:'JetBrains IntelliJ IDEA Ultimate', brand:'JetBrains', category:'dev', price:199, rating:4.9, stock:999,
    description:'IDE для Java, Kotlin, Spring.',
    licenseTypes:['Personal','Business','Enterprise'], term:'1 год' },
  { id:41, title:'JetBrains WebStorm', brand:'JetBrains', category:'dev', price:129, rating:4.8, stock:999,
    description:'IDE для JavaScript и TypeScript.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:42, title:'JetBrains All Products Pack', brand:'JetBrains', category:'dev', price:779, rating:4.9, stock:999,
    description:'Все продукты JetBrains в одной подписке.',
    licenseTypes:['Personal','Business','Enterprise'], term:'1 год' },
  { id:43, title:'Visual Studio Professional 2022', brand:'Microsoft', category:'dev', price:499, rating:4.7, stock:500,
    description:'IDE для .NET, C++, Azure.',
    licenseTypes:['Business','Enterprise'], term:'бессрочная' },
  { id:44, title:'GitHub Copilot Business', brand:'GitHub', category:'dev', price:228, rating:4.7, stock:999,
    description:'AI-ассистент для кода. Корпоративные политики.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:45, title:'Postman Enterprise', brand:'Postman', category:'dev', price:479, rating:4.5, stock:500,
    description:'Платформа для тестирования API.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },

  { id:50, title:'Dropbox Business Plus', brand:'Dropbox', category:'cloud', price:288, rating:4.5, stock:999,
    description:'Облачное хранилище 5 ТБ на пользователя.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:51, title:'Google Workspace Business', brand:'Google', category:'cloud', price:172.80, rating:4.7, stock:999,
    description:'Почта на домене, Drive, Meet, Docs. 2 ТБ.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:52, title:'Dropbox Plus', brand:'Dropbox', category:'cloud', price:119.88, rating:4.4, stock:999,
    description:'Облако 2 ТБ для личного использования.',
    licenseTypes:['Personal'], term:'1 год' },
  { id:53, title:'Notion Enterprise', brand:'Notion', category:'cloud', price:239, rating:4.6, stock:999,
    description:'Корпоративная wiki, SSO, аудит-логи.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:54, title:'iCloud+ 2 ТБ', brand:'Apple', category:'cloud', price:119.88, rating:4.5, stock:999,
    description:'2 ТБ облачного хранилища iCloud.',
    licenseTypes:['Personal'], term:'1 год' },

  { id:60, title:'CCleaner Professional', brand:'Piriform', category:'utility', price:39.95, rating:4.3, stock:999,
    description:'Очистка системы и реестра. До 3 ПК.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:61, title:'WinRAR', brand:'RARLAB', category:'utility', price:29, rating:4.5, stock:999,
    description:'Архиватор RAR и ZIP с бессрочной лицензией.',
    licenseTypes:['Personal','Business'], term:'бессрочная' },
  { id:62, title:'Acronis Cyber Protect Home Office', brand:'Acronis', category:'utility', price:89.99, rating:4.4, stock:999,
    description:'Резервное копирование + защита от malware.',
    licenseTypes:['Personal','Business'], term:'1 год' },
  { id:63, title:'TeamViewer Business', brand:'TeamViewer', category:'utility', price:548.90, rating:4.5, stock:500,
    description:'Удалённый доступ для коммерческих команд.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:64, title:'Parallels Desktop for Mac', brand:'Parallels', category:'utility', price:99.99, rating:4.4, stock:999,
    description:'Запуск Windows и Linux на Mac.',
    licenseTypes:['Personal','Business'], term:'бессрочная' },

  { id:70, title:'Microsoft SQL Server Standard', brand:'Microsoft', category:'database', price:989, rating:4.7, stock:200,
    description:'Реляционная СУБД для бизнеса.',
    licenseTypes:['Business','Enterprise'], term:'бессрочная' },
  { id:71, title:'Red Hat Enterprise Linux', brand:'Red Hat', category:'database', price:349, rating:4.6, stock:500,
    description:'Корпоративный Linux с поддержкой 24/7.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:72, title:'MongoDB Atlas Enterprise', brand:'MongoDB', category:'database', price:597, rating:4.5, stock:500,
    description:'Управляемая NoSQL-база в облаке.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:73, title:'PostgreSQL Pro Support', brand:'EDB', category:'database', price:449, rating:4.6, stock:500,
    description:'Коммерческая поддержка PostgreSQL.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
  { id:74, title:'Redis Enterprise', brand:'Redis', category:'database', price:779, rating:4.7, stock:300,
    description:'In-memory БД с репликацией и кластером.',
    licenseTypes:['Business','Enterprise'], term:'1 год' },
];

const CAT_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

function escapeXml(s) {
  return String(s).replace(/[<>&"']/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c])
  );
}

function makeThumb(icon, title) {
  const short = String(title).slice(0, 22);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eef2ff"/><stop offset="1" stop-color="#f0f9ff"/>
    </linearGradient></defs>
    <rect width="400" height="400" fill="url(#g)"/>
    <text x="200" y="180" font-size="120" text-anchor="middle">${icon}</text>
    <text x="200" y="280" font-size="22" text-anchor="middle" fill="#4f46e5" font-family="sans-serif" font-weight="700">${escapeXml(short)}</text>
    <rect x="120" y="310" width="160" height="34" rx="17" fill="#4f46e5"/>
    <text x="200" y="333" font-size="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700">DIGITAL LICENSE</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function buildProduct(raw) {
  const cat = CAT_MAP[raw.category] || { name: 'ПО', icon: '📦' };
  const thumb = makeThumb(cat.icon, raw.title);
  return {
    id: raw.id,
    title: raw.title,
    brand: raw.brand,
    description: raw.description,
    price: raw.price,
    rating: raw.rating,
    stock: raw.stock,
    category: raw.category,
    categoryName: cat.name,
    categoryIcon: cat.icon,
    licenseTypes: raw.licenseTypes || ['Personal'],
    term: raw.term || '1 год',
    sku: 'LIC-' + String(raw.id).padStart(4, '0'),
    activation: 'Ключ активации',
    delivery: 'Мгновенно на e-mail',
    thumbnail: thumb,
    images: [thumb],
  };
}

const PRODUCTS = RAW_PRODUCTS.map(buildProduct);

export const api = {
  async listProducts({ limit = 12, skip = 0, q = '', category = '', sortBy = '', order = '', license = '' } = {}) {
    let list = PRODUCTS.slice();
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s)
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (license) list = list.filter((p) => p.licenseTypes.includes(license));

    if (sortBy) {
      const dir = order === 'desc' ? -1 : 1;
      list.sort((a, b) => {
        if (sortBy === 'price') return (a.price - b.price) * dir;
        if (sortBy === 'rating') return (a.rating - b.rating) * dir;
        if (sortBy === 'title') return a.title.localeCompare(b.title) * dir;
        return 0;
      });
    }

    const total = list.length;
    const products = list.slice(skip, skip + limit);
    return { products, total, skip, limit };
  },

  async getProduct(id) {
    const p = PRODUCTS.find((x) => x.id === +id);
    if (!p) throw new Error('Товар не найден');
    return p;
  },

  async getCategories() {
    return CATEGORIES;
  },

  async getOrders(limit = 20) {
    const res = await fetch(`${API_BASE}/carts?limit=${limit}`);
    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    return data.carts.map((c) => ({
      id: 'ORD-' + c.id,
      rawId: c.id,
      userId: c.userId,
      total: c.discountedTotal || c.total,
      totalProducts: c.totalProducts,
      products: c.products.map((p) => ({
        title: p.title,
        price: p.price,
        quantity: p.quantity,
        licenseType: 'Personal',
      })),
      status: ['pending', 'paid', 'active', 'cancelled'][c.id % 4],
      createdAt: new Date(Date.now() - c.id * 86400000 * 2).toISOString(),
      email: `user${c.userId}@example.com`,
    }));
  },

  async login(body) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Неверный логин или пароль');
    return res.json();
  },
};