const routes = [
  {
    path: '/',
    url: './index.html'
  },
  // スキャン画面
  {
    path: '/scan/',
    componentUrl: './pages/scan.html'
  },
  // 履歴画面
  {
    path: '/list/',
    componentUrl: './pages/list.html'
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html'
  }
]
