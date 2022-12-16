import { useEffect, useState } from 'react';

const FooterLayout = () => {

  useEffect(() => {
    let deferredPrompt:any;
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
    });

    const installApp = document.getElementById('installApp');
    installApp?.addEventListener('click', async () => {
      if (deferredPrompt !== null) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
              deferredPrompt = null;
          }
      }
    });
  }, [])

  return(
    <div>
      <hr></hr>
      <br />
      <button id="installApp">Install PWA</button>
    </div>
  )
}

export default FooterLayout;