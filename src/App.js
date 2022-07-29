import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('receipts');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || receipts state || receipts array of objects
  const [receipts, setreceipts]=useState(getDatafromLS());

  // input field states
  const [date, setDate]=useState('');
  const [amount, setAmount]=useState('');
  const [paymod, setPaymod]=useState('');
  const [Remak, setRemak]=useState('');

  // form submit event
  const handleAddReceiptSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let receipt={
      date,
      amount,
      paymod,
      Remak
    }
    setreceipts([...receipts,receipt]);
    setDate('');
    setAmount('');
    setPaymod('');
    setRemak('');
  }

  // delete receipt from LS
  const deleteReceipt=(date)=>{
    const filteredReceipts=receipts.filter((element,index)=>{
      return element.date !== date
    })
    setreceipts(filteredReceipts);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('receipts',JSON.stringify(receipts));
  },[receipts])

    
  return (
    <div className='wrapper'>
      
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddReceiptSubmit}>
            <h4>Receipt Details</h4>
            <label>Date*</label>
            <input type="date" className='form-control' placeholder='Enter date' required
            onChange={(e)=>setDate(e.target.value)} value={date}></input>
            <br></br>
            <label>Amount*</label>
            <input type="number" className='form-control' placeholder='Enter Amount' required
            onChange={(e)=>setAmount(e.target.value)} value={amount}></input>
            <br></br>
            <label>Payment mode*</label>
            <select className="form-control" aria-label="Default select example"
            onChange={(e)=>setPaymod(e.target.value)} value={paymod}>
              <option selected>Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>
            <br></br>
            <label>Remark*</label>
            <input type="text" className='form-control' placeholder='Enter Remark' required
            onChange={(e)=>setRemak(e.target.value)} value={Remak}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              Submit
            </button>
            <button type="reset" className='btn btn-danger btn-md my-2'>
              Reset
            </button>
          </form>
        </div>

        <div className='view-container'>
          {receipts.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Payment Mode</th>
                    <th>Remark</th>
                    <th>Amount</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View receipts={receipts} deleteReceipt={deleteReceipt}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setreceipts([])}>Remove All</button>
          </>}
          {receipts.length < 1 && <div>No Receipt are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
