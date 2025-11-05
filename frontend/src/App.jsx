import React, { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import BackToTop from './components/BackToTop'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  // active section highlighting
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id], div[id^="home"], div[id^="projects"]'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, { root: null, rootMargin: '-120px 0px -60% 0px', threshold: 0 })
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // scroll to target with offset for fixed header
  const scrollTo = (id) => {
    const header = document.getElementById('site-header')
    const headerOffset = header ? header.offsetHeight : 72
    const target = document.getElementById(id)
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - 8
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white">
      <Header theme={theme} setTheme={setTheme} active={active} onNavigate={scrollTo} />

      <main className="pt-[88px]">
        <div id="home" className="relative container mx-auto px-4">
          <div className="flex min-h-[580px] flex-col gap-6 items-center justify-center p-4 bg-cover bg-center bg-no-repeat rounded-lg" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBk09cFo-Gk2HTwL2Kz6ksCUI-P4Ej8n3B5MdNegpS76baqJxOHNQCMn4IP_S-SCF9Cwr-YXINDogWFXrx5WVFTJUvzr0FBYbbpbdr2w9sXeX7NI2jSv7WNV7nhjRai8Z87966c9sxeQXNuKSNQKmr_eZbMES82j0zTUGwOZyQ2n85BmXhc514O5TiQ65_bLFnsAPGb3LIQhxgWocJosoT05OuohR3l0vGhy6a-GyuBVFIuQBQ1KtQ08k-hp-OBTPBkY10P3SWwiHs')`}}>
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">Building a more secure future, one line of code at a time</h1>
              <h2 className="text-white/80 text-sm md:text-base max-w-2xl">Merging a Flask project with cybersecurity achievements to showcase a unique blend of skills.</h2>
            </div>
            <button onClick={() => scrollTo('projects')} className="mt-6 flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white font-bold hover:bg-primary/90 transition-colors">View My Work</button>
          </div>
        </div>

        <section id="projects" className="container mx-auto px-4 py-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">My Flask Projects</h2>
            <p className="text-gray-600 dark:text-gray-300">A collection of my recent Flask projects, demonstrating my skills in web development and backend engineering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="border rounded-lg overflow-hidden hover:shadow-lg">
              <div className="aspect-video bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_mCUwgFxAyj06P9KOf0SMo9gtfpwxMgPHKXRCtcXjQc3451VihB6Fbb4JuV2o-mUlHD1lefL8K2RcdeYbG4rxpnvYTgRp8ftjWMHEQRRPMn64dMALTrqvh9kQBPu12BfzXnuWvM8e_1qLpMDED0QmLyCc8qX0JU8kgVXpcKaLV2sImqD8AhNvCk52r50PurawhcQ7QY3rzhyr4c_w97Td55ZudHXBoRV-6xbUG6DHf_QB3CQq94SFh8Pq1rHDbDquEPQ6SVhLOy4')`}}></div>
              <div className="p-4">
                <h3 className="font-medium">E-commerce Platform</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">A fully functional e-commerce website built with Flask and Stripe integration.</p>
              </div>
            </article>

            <article className="border rounded-lg overflow-hidden hover:shadow-lg">
              <div className="aspect-video bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-WDSzwMhzaF-FwAi3qnw64DHfn_uISj66C0AV81F7NthuUD5PKukYmo4J8Tv82EznsatZtSL0lQ4uRRmf3AXK2E48YGwM2qsDNAbaYEY0iSCbyo6Pb9-1puUA0CWedwm6rBtmt9gmvhVSDMHdG6pEHxw1oePD5ow_qzLeDIGLVja-9L3UFYChl-HrmL2qWK8M4L7qdC9UzSJmqeAyW57NOwgcBGiJn1eRTA7udoz6bo9L_aFo1vrbg3FAqZi9nkaouJ1O7LVF5Mo')`}}></div>
              <div className="p-4">
                <h3 className="font-medium">Blog Application</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">A feature-rich blog with user authentication and content management.</p>
              </div>
            </article>

            <article className="border rounded-lg overflow-hidden hover:shadow-lg">
              <div className="aspect-video bg-cover bg-center" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCh5Q8GeHpvPfkq7Jwwcfi5S2hk__-LNrAO9PPqxctgnhg5QjVr_2yRgJyXILCZTJsEwblc9hEiTwtOttXNY9zDThaPRLKwPiinwrH37ZserQ7OM1IMXo_WgD9anymkhN7wwB9wFQaC1TTchhDkHp0MWZ4K3g-JOiz5HpVJjq8ghVfEED2_E8QBuGbQHl_Ji3clZiEkZJHG94oBbST3dBncl6a97rNyFKYkfUlwPG2KnCHx2yV6DKuYDogGZuRfzo3JSM77RTxOhG8')`}}></div>
              <div className="p-4">
                <h3 className="font-medium">Task Management API</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">A RESTful API for managing tasks, built with Flask-RESTful.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="skills" className="bg-gray-50 dark:bg-gray-900/50 px-4 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">A showcase of my proficiencies in both Flask development and Cybersecurity.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg border bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-800">
                <h3 className="text-primary text-2xl font-bold mb-4">Flask Development</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Python & Flask Framework</li>
                  <li>Database Management (SQLAlchemy)</li>
                  <li>RESTful API Design</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg border bg-background-light dark:bg-background-dark border-gray-200 dark:border-gray-800">
                <h3 className="text-primary text-2xl font-bold mb-4">Cybersecurity</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Penetration Testing</li>
                  <li>Network Security</li>
                  <li>Incident Response</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="px-4 py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">My Cybersecurity Accomplishments</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-4 items-start">
                <div className="text-primary"><span className="material-symbols-outlined">shield</span></div>
                <div>
                  <h4 className="font-medium">Penetration Testing Report</h4>
                  <p className="text-gray-600 dark:text-gray-300">Identified and reported critical vulnerabilities in a web application, leading to enhanced security measures.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-primary"><span className="material-symbols-outlined">security</span></div>
                <div>
                  <h4 className="font-medium">Incident Response Simulation</h4>
                  <p className="text-gray-600 dark:text-gray-300">Led a team in a simulated cyber attack, successfully containing the breach and restoring systems.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="text-primary"><span className="material-symbols-outlined">lock</span></div>
                <div>
                  <h4 className="font-medium">Security Policy Development</h4>
                  <p className="text-gray-600 dark:text-gray-300">Developed and implemented a comprehensive security policy for a mid-sized organization.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="certificates" className="px-4 py-16 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">My Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-cover bg-center aspect-video rounded-lg p-6" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-vodBeoFB3e5taw9Xrq1h9zzkCHZHQloP-SSbQJfo2J85dF8xYDiBvHqqaCf8hkoWVRdE3_Q18dweC5xWoh0U7rp2EJsOUYdMBKfVf3yjiszmceIamvjI-VwhSr5d9ipOSc4zh020vubUA6ckmfqmLF3tx1DBDBERJCYSHo6rk4Pzxsgp5YSeHRsdd8RnkjIPncSCbupSd4QqMaU5oAePKG8bTFnPlZG_BgJaaRvBOHNnfkC6Jfg5U5j1N5q6LN0BLE_FLxBeKzo')`}}>
                <p className="text-white text-xl font-bold leading-tight">Certified Ethical Hacker (CEH)</p>
              </div>
              <div className="bg-cover bg-center aspect-video rounded-lg p-6" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBB1hbrZOAZpL_YGQbRciqxXQEJQeuAnh91VFfsBKIgBl8Iu408UuRz-1lH65vwVr6HRAzuM8obPgcxgDp3dWHksDitYYd8CmZ91NOUakOqJEWLj3ahkbl8A-asjQ7zHmHMTQiSc8OK1V06T0UtD-Xv1iA_fOdP0jkevfOE0KtLtfy9YVYYZbp1Cfsm8kDodrPe0A3g3hsw-2zgB1dt5NSpw2G5kbLF-KkN3JwnZm4zPQOUt3rOPBVzEuDm6FEbDpSQo4vwJv7oK80')`}}>
                <p className="text-white text-xl font-bold leading-tight">CompTIA Security+</p>
              </div>
              <div className="bg-cover bg-center aspect-video rounded-lg p-6" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpCRN4iiMx9ypBGL9VysiS-003jGVgTFW5MOlDi4qEKIRV5c_TGzmc2DwspHiadYuIf4_DNs9YXYYmh967fl4aQweb-h1OyDLUfvFMfpvurEXBJSbYZrBOZc4fKMGznTAQ1KfVM9cHhib5RQ6pb8gXCCB-ZtsZhKDuM71587pKCLaWH3MVR45KtfIArszJdMldNt-LOXvf5qsxtqQOmhdKJnUSdlymT_tUc91xIOUDKCGXTS4KxvgeOsKW567TfJzWtd0C8NVBs7E')`}}>
                <p className="text-white text-xl font-bold leading-tight">Certified Information Systems Security Professional (CISSP)</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-16">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-gray-900 dark:text-white" rows="4" />
              </div>
              <div>
                <button className="w-full py-2 px-4 rounded-md text-white bg-primary hover:bg-primary/90">Send Message</button>
              </div>
            </form>

            <div className="flex justify-center space-x-6 mt-8">
              <a className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" href="#"><span className="sr-only">Twitter</span>Twitter</a>
              <a className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" href="#"><span className="sr-only">GitHub</span>GitHub</a>
              <a className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" href="#"><span className="sr-only">LinkedIn</span>LinkedIn</a>
            </div>
          </div>
        </section>

      </main>

      <BackToTop />
    </div>
  )
}
