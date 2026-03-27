import React from 'react'

function Footer() {
  return (
    <footer className="footer fixed bottom-0 sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by devsConnect</p>
  </aside>
</footer>
  )
}

export default Footer
