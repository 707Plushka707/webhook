let testData;
export default async (req, res) => {
  if(req.method === 'POST'){
    testData = req.body
    console.log("req.body: ",req.body);
    console.log("testData: ",testData);
    res.status(200).json({message: "Hello"});
  }
  console.log("테스트이빈다 ",testData)
  if(req.method === 'GET'){
    res.status(200).json({message: testData});
    console.log("전송완료  ", testData);
  }
}