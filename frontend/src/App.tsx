import './App.css';
import {api} from './/api/index';

function App() {
  async function authorization () {
    const res: {
      id: number;
      fullName: string;
      dob: string;
      email: string;
      token: string
    }= await api.get('http://localhost:4000/auth/authorization', {params:{}}); 
    alert (res.id +`\n`+ res.fullName +`\n`+ res.dob +`\n`+ res.email+`\n` + res.token);
  };

  const body = {
      fullName: "Susy Black",
      dob: "12.12.2000",
      email: "susy@mail.ru",
      password: 'susAn2'
    };
  async function registration () {
    const res: {
      id: number;
      fullName: string;
      dob: string;
      email: string;
      token: string
    }= await api.post('http://localhost:4000/auth/registration', body);
    alert (res.id +`\n`+ res.fullName +`\n`+ res.dob +`\n`+ res.email+`\n` + res.token);
  }

  return (
    <div className="App">
        <input type="button" id="but" value="authorization" onClick={authorization}/>
        <input type="button" id="but" value="registration" onClick={registration}/>
        <form action="/edit" method="POST">
          <input type="text" name="fullname" placeholder="Full name"/>
          <input type="date" name="date"/>
          <input type="email" name="email" placeholder="email"/>
          <input type="password" name="password" placeholder="password"/>
        </form>
      </div>
  );
}

export default App;
