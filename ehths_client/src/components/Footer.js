const Footer = () => {
    return (
      <div className='w-full bg-black'>
          <div className = "container flex justify-between py-3 mx-auto">
              <div className='w-30 md:block hidden'>
                  <h1 className='text-4xl font-bold text-white'>linkne<span className = "green">.io</span></h1>
                  <p className='text-gray-400 mt-1'>linkne.io bir URL-kısaltıcısından çok daha fazlasıdır. Web sitemizi sürekli olarak güncelliyoruz ve pek çok harika yeni özellikler getiriyoruz. Bir linke tıklayın veya kısaltın, bizimle para kazanacaksınız.</p>
              </div>
  
              <div className='flex flex-col md:flex-row md:w-1/2  md:justify-between mx-auto text-center md:text-left'>
                  <div className='md:w-33 mt-3 md:mt-0'>
                      <h5 className='text-white text-2xl font-bold'>Ödeme</h5>
                      <ul className='text-muted navbar-nav'>
                          <li><a className='green text-decoration-none'>Ödeme oranları</a></li>
                          <li><a className='text-gray-400'>Ödeme hakkında</a></li>
                          <li><a  className='text-gray-400'>Anonimlik</a></li>
                      </ul>
                  </div>
  
                  <div className='md:w-33 mt-3 md:mt-0'>
                      <h5 className='text-white text-2xl font-bold'>Gizlilik Politikası</h5>
                      <ul className='text-muted navbar-nav'>
                          <li className=''><a className='green text-decoration-none' href = "/termsofuse">Kullanım Şartları</a></li>
                          <li><a className='text-gray-400' href = "/privacy">Gizlilik Politikası</a></li>
                      </ul>
                  </div>
  
  
                  <div className='md:w-33 mt-3 md:mt-0'>
                      <h5 className='text-white display-20 text-2xl font-bold'>Bize Ulaş</h5>
                      <ul className='text-muted navbar-nav'>
                          <li className=''><a className=' text-gray-400 text-decoration-none' href = "/">E-mail gönder</a></li>
                          <div className='flex justify-center'>
                              <img src = "images/twitter.svg"></img>
                              <img src = "images/instagram.svg"></img>
                              <img src = "images/telegram.svg"></img>
                          </div>
                      </ul>
                  </div>
  
              </div>
              
  
          </div>
      </div>
    )
  }
  
  
  export default Footer