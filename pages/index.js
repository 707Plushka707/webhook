import axios from "axios"

export default function index() {
  const test = async() => {
    try {
      const response = await axios.get('/api/webhook');
      const responseTest = response.data;
      console.log("테스트",responseTest);
    } catch(err) {
      console.log("error >>>",err);
    }
  };
  return(
    <>
    <button onClick={test}>
      클릭
    </button>
    </>
  )
}