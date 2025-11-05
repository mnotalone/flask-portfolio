import React, { useState } from 'react'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
]

export default function Header({ theme, setTheme, active, onNavigate }) {
  const [open, setOpen] = useState(false)

  return (
    <header id="site-header" className="fixed top-0 left-0 right-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-3">
          <img src="/static/logo-bg1.png" data-dark-src="/static/logo-bg2.png" alt="My Portfolio Logo" className="h-16 md:h-20 w-auto object-contain transition-colors" />
          <span className="text-gray-900 dark:text-white text-base md:text-lg font-bold">CyberFlask</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} id="theme-toggle" className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); onNavigate(l.id) }} className={`nav-link ${active === l.id ? 'text-primary font-semibold' : ''}`}>{l.label}</a>
          ))}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} id="mobile-theme-toggle" className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>

          <button id="mobile-menu-btn" onClick={() => setOpen(o => !o)} className="p-2">
            <span className="material-symbols-outlined text-2xl">{open ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div id="mobile-menu" className={`${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden md:hidden transition-all`}> 
        <nav className="flex flex-col py-2">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); onNavigate(l.id); setOpen(false); }} className={`mobile-nav-link block px-6 py-4 text-gray-900 dark:text-white text-center ${active === l.id ? 'bg-primary/10' : ''}`}>{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
