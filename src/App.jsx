import { useState, useEffect  } from 'react'
import axios from 'axios'
import './index.css'
 

// var urlDaApi = 'http://localhost:3001/teste'
 //var urlDaApi = 'https://alert-hallowed-art.glitch.me/pegaTweetsGuardado'



function App() {
  const [atualizaGrid, setAtualizaGrid] = useState(false)
  const [respostaApi , setRespostaApi] = useState([])
  const [urlDaApi , setUrlDaApi] = useState('https://alert-hallowed-art.glitch.me/pegaTweetsGuardado')


 


  async function CarregaDados() {
    await axios.get(urlDaApi).then(response => {
      console.log("Carregou resposta da api novamente.")
      setRespostaApi(response.data)
      console.log(response.data)
    })
    

    // await respostaApi.forEach((item) => {console.log(item.nome)})

  }

   
  useEffect(() => { 
    CarregaDados(); 
 
    const interval = setInterval(() => { 
    console.log('This will run every 10 seconds!');
    CarregaDados(); 
    console.log( 'Consultou dados novamente e atualizaou conforme a mudança state atualizaGrid: '+ atualizaGrid)



    }, 10000);
    return () => clearInterval(interval);


  },[])



  return (
    <div className='container-fluid' >

    <div className="row">
      <div  >
          <h1>Verificar Rodovias 🔎</h1>
      </div>
    </div>


      <div className='row' >
        
        <div className='col-sm'>
        <h2>Todos os informativos</h2>
             <ul>
                { respostaApi.length == 0 ? "Carregando..." : '' }
                { respostaApi.map(item =>  (
                 
                 <div style={{backgroundColor: 'rgba(255,255,255,.02)', borderRadius: '10px'}}>
                 <details open  className='ul-pai'>
                 
                 <summary> {item.nome } </summary>
                 
                 <ul className='ul-filho'>

                    {item.arrayRepostaTweets.data.map((subitem) => (<li>{subitem.text.replaceAll('??', 'ℹ️').replaceAll('?','')}</li>))}

                  </ul> 



                  </details>

                
                </div>

                )) } 
            </ul>
        </div>


        <div  className='col-sm'>
          <h2>Atenção ⚠️</h2>
          <p>Bloqueios, acidentes, interdição</p>
          <ul>
                { console.log(respostaApi.length)}
                { respostaApi.map(item =>  (
                 <div style={{backgroundColor: 'rgba(255,255,255,.02)', borderRadius: '10px'}}>
                 <ul className='ul-pai'>
                 <li>{item.nome} </li>

                 
                 <ul className='ul-filho'>
                    {item.arrayRepostaTweets.data.map((subitem) => (
                    
                    subitem.text.search('Bloqueio') != -1 || 
                    subitem.text.search('bloqueio') != -1 ||
                    subitem.text.search('Interdição') != -1 ||  
                    subitem.text.search('fila') != -1 ||
                    subitem.text.search('Fila') != -1  ||
                    subitem.text.search('liberadas')  != -1  || 
                    subitem.text.search('liberada')  != -1  || 
                    subitem.text.search('congestionamento') != -1 ?   <li>{subitem.text.replaceAll('??', '⚠️').replaceAll('?',' ')}</li> : '' //<li>{subitem.text.replaceAll('??', 'ℹ️').replaceAll('?',' ')}</li> : "Carregando"
                    
                    ))}
                  </ul> 




                 </ul>


                </div>
                )) } 


          </ul>
        </div>


        <div className='col-sm'>
          <h2>Mapa</h2>
          <ul>
          <div style={{width: "100%"}}><iframe width="100%" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=Rod.%20Fern%C3%A3o%20Dias+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"> </iframe></div>
          </ul>
        </div>


        
        
      </div>
    </div>
  )
}

export default App
