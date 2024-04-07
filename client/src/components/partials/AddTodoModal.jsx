import React, { useState } from 'react'
import {ToastContainer,toast} from "react-toastify";
import { createTodoApi } from '../../services/api';

function AddTodoModal() {
    const [todoDesc,setTodoDesc]=useState('');


const handleTodoSubmit=async()=>{
    console.log(todoDesc,'todoDesc')
    if(todoDesc===''){
        toast('todo is required')
        return;
    }

    const result = await createTodoApi({desc:todoDesc});

    if(result.status ===200 && result.data.status === 200){
        toast('Todo Added');
    }else{
        toast(result.data.message);
    }
}

  return (
    <div className="modal mt-5" id='exampleModal' tabIndex="-1" role='dialog'>
            <ToastContainer/>
                <div className="modal-dialog" role='document'>
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                Add new todo
                            </div>
                            <button type='button' className='btn-close' 
                            data-bs-dismiss="modal" arial-label="close">
                                <span arial-hidden="true">

                                </span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group'>
                                <textarea name="" className='form-control'
                                    rows={3}
                                    onChange={(e)=>{setTodoDesc(e.target.value)}}
                                    placeholder = "Write Todos...">
                                </textarea>

                            </div>

                        </div>
                        <div className="modal-footer">

                            <button className='btn btn-secondary' onClick={()=>{setTodoDesc('')}} data-bs-dismiss="modal">close todo</button>
                            <button className='btn btn-secondary' onClick={handleTodoSubmit}>save todo</button>

                        </div>
                    </div>
                </div>
            </div>
  )
}

export default AddTodoModal
