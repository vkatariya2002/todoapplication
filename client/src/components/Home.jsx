import React from 'react';
import { useState } from 'react';
import Todo from './partials/Todo';
import Header from './partials/Header';
import AddTodoModal from './partials/AddTodoModal';
import { getTodoListApi, getToken } from '../services/api';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Home() {
    const navigation = useNavigate()

    const [searchText,setSearchText]=useState("");

    const [list,setList]=useState([]);

    const [filteredList,setFilteredList]=useState([]);

    const [refreshList,setRefreshList]=useState(1);


    useEffect(() => {
      if(!getToken()){
        navigation('/login')
      }   
      fetchTodoList()
    }, [refreshList])


    useEffect(() => {
     if(searchText===''){
        setFilteredList(list)
     }else{
        const filterlist = list.filter(todo=>todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
        setFilteredList(filterlist)
     }
      }
    , [list,searchText])
    




    async function fetchTodoList(){
        //console.log('todolist',result)
        const result = await getTodoListApi()
        if(result.status === 200 && result.data.status === 200){
            console.log(result);
            // setList(result.data.data.todos.reverse())
            setList(result.data.data.reverse())
        }
    }
    

    return (
        <div>
            <Header searchText={searchText} setSearchText={setSearchText} />
            <ToastContainer/>
            <div className="container">
                <div className="row justify-content-md-center mt-4">
                    {
                        filteredList.map((todo)=> <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
                    }

                    
                    {
                        filteredList.length === 0 && <div className='notFoundTodos'>
                            No Todos Found
                        </div>
                    }

                </div>
            </div>
            <div className='' style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
                <button type='button' className='btn btn-outline-light' data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
            </div>


            <AddTodoModal setRefreshList={setRefreshList}/>
        </div>
    )
}

export default Home;
