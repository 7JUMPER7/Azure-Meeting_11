import './App.css';
import axios from 'axios';
import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {motion} from 'framer-motion';

function App() {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');

  const submit = async (e) => {
    setIsSent(true);
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const company = {
      "data": 
          [
            {
              "name": form.elements[0].value, 
              "main_category": form.elements[1].value, 
              "deadline": form.elements[2].value, 
              "goal":  form.elements[3].value, 
              "launched": form.elements[4].value, 
              "pledged": form.elements[5].value, 
              "backers": form.elements[6].value, 
              "Column16": "0", 
              "Column17": "0", 
              "Column18": "0", 
              "Column19": "0"
            }
          ], 
      "method": "predict"
    }

    await axios.post('https://mlserver.azurewebsites.net/api/AnalyzerFunction', company).then((res) => {
      const {response} = res.data;
      if(response) {
        if(response === 'successful') {
          setResultText('Successful');
        } else if(response === 'live') {
          setResultText('Live');
        } else if(response === 'failed')
          setResultText("Failed");
      }
    }).catch(err => {
      setResultText('Some error happened.');
      console.log(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }
  
  return (
    <div className="App">
      <form onSubmit={(e) => submit(e)}>
        <label htmlFor="name">
          <span>Название: </span>
          <input type="text" name="title"></input>
        </label>
        <label htmlFor="category">
          <span>Категория: </span>
          <input type="text" name="category"></input>
        </label>
        <label htmlFor="deadline">
          <span>Дедлайн: </span>
          <input type="date" name="deadline"></input>
        </label>
        <label htmlFor="goal">
          <span>Цель:</span>
          <input type="number" name="goal"></input>
        </label>
        <label htmlFor="launched">
          <span>Запуск: </span>
          <input type="date" name="launched"></input>
        </label>
        <label htmlFor="pledged">
          <span>Собрано: </span>
          <input type="number" name="pledged"></input>
        </label>
        <label htmlFor="backers">
          <span>Кол-во спонсоров:</span>
          <input type="text" name="backers"></input>
        </label>
        <input type="submit"></input>
      </form>

      <CSSTransition
        in={isSent}
        mountOnEnter
        classNames="resultContainer"
        timeout={1000}>
        <div className="rs">
          {
            isLoading ? 
            <motion.div
              animate={{
                scale: [1, 1.2],
                rotate: [0, 720],
                borderRadius: ["10%", "50%"]
              }}
              transition={{
                duration: 2,
                ease: [0.31, 0, 0, 0.31],
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.3
              }}
              className="loader"></motion.div>
            :
            <motion.h3
              initial={{
                x: 100,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1
              }}
              type="spring">
                {resultText}
            </motion.h3>
          }
        </div>  
      </CSSTransition>
    </div>
  );
}

export default App;
