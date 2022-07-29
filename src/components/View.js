import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({receipts,deleteReceipt}) => {
    
    return receipts.map(receipt=>(
        
        <tr key={receipt.date}>
            <td>{receipt.date}</td>
            <td>{receipt.paymod}</td>
            <td>{receipt.Remak}</td>
            <td>Rs. {receipt.amount}/-</td>
            <td className='delete-btn' onClick={()=>deleteReceipt(receipt.date)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}