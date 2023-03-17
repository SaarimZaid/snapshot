import './App.css'
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  const searchData = useRef(null)
  const [searchText, setSearchText] = useState('food')
  const [imageData, setImageData] = useState([])
  useEffect(() => {
    const params = {
      method: 'flickr.photos.search',
      api_key: 'b67b54d6b00af58b5055d3f9b8383f31',
      text: searchText,
      sort: '',
      per_page: 30,
      license: '4',
      extras: 'owner_name, license',
      format: 'json',
      nojsoncallback: 1
    }

    const parameters = new URLSearchParams(params)
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((res)=>{
      console.log(res.data)
      const arr = res.data.photos.photo.map((imgData)=>{
        return imageURL(imgData, 'q')
      })
      setImageData(arr)
    }).catch((err)=>console.log(err))
    .finally(()=>{})
  },[searchText])

  const imageURL = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size){
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (<>
    <section className="inputField">
      <h1>Snapshot</h1>
      <input onChange={(e)=>{searchData.current = e.target.value}} placeholder='Saarim Zaid' />
      <button onClick={()=>{setSearchText(searchData.current)}}>Search</button>
      <section className='btn'>
        <button onClick={()=>{setSearchText('mountain')}}>Mountain</button>
        <button onClick={()=>{setSearchText('beaches')}}>Beaches</button>
        <button onClick={()=>{setSearchText('birds')}}>Birds</button>
        <button onClick={()=>{setSearchText('food')}}>food</button>
      </section>
    </section>
    <section className="imgDisplayField">
        {imageData.map((imageUrl, key)=>{
          return <article className='img'>
            <img src={imageUrl} key={key} alt=''/>
          </article>
        })}
    </section>
    </>
  );
}

export default App;
