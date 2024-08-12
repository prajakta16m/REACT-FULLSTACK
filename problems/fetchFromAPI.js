import {useState, useEffect} from 'react';

export default function App() {

    const userData = [];
    const [data, setData] = useState([{name: 'Default'}]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                return res.json();
            }).then ( (json) => {
                console.log(json);
                setData(json);
            });
    }, []);

  return <>
      <h1>Hello world</h1>
  
      <div>
          { data?.map( (obj) => <div>{obj.name}</div> ) }
      </div>
  </>
}

