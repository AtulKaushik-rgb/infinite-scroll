import React, { useState, useEffect, useRef, useCallback } from "react";
import useStyles from "../../dragTheme";
import { GreenCheckbox, InputField } from "../../dragTheme";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "@material-ui/core";
import uuid from "react-uuid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useDebounce } from "use-debounce";

const SelectOptions = (props) => {
  const [choicesCount, setChoicesCount] = useState(0);
  const [chosenCount, setChosenCount] = useState(0);
  const [choices, setChoices] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [value] = useDebounce(inputText, 300);

  useEffect(() => {
    setInputText("");
    setLoading(true);
    props.getNextOptions();
  }, [value]);


  // let inputRef = useRef();

  // let newFn = () => {
  //   console.log(inputRef.current);
  // };

  // let debounce = (func, wait) => {
  //   let timeout;
  //   return function (...args) {
  //     console.log(...args);
  //     if (timeout) clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       timeout = null;

  //       func();
  //     }, wait);
  //   };
  // };
  // const debounceOnChange = React.useCallback(debounce(newFn, 300), []);

  const observer = useRef();

  const dragUpdate = (e) => {
    

    console.log(e.destination.index);
    // if(e.destination.index > choices.length - 5)
    // {
    //   console.log(e)
    //   onDragEndHandlerForChoices(e);
    // }
    // try {
    //   console.log(e);
    //   console.log(e.destination.index > (choices.length - 5));
    // } catch (error) {
    //   console.log(error.message);
    // }

    // if(e.destination.index > choices.length - 4)
    // return;

    // observer.current = new IntersectionObserver(entries=>{
    //   if(entries[0].isIntersecting){

    //     return
    //    // props.getNextOptions();
    //     //setPageNumber(prevPageNumber=>prevPageNumber+1);
    //   }

    // })
  };

  const lastOption = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          props.getNextOptions();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const classes = useStyles();

  //get random 10 users and add it to available choices
  // useEffect(() => {
  //   //console.log(pageNumber);
  //   if(!value) return;
  //   setLoading(true);
  //   let filteredData;
  //   async function fetchData() {
  //     try {
  //       //Just pass options to the drag and drop.
  //       console.log('inside function')
  //       console.log(value);

  //      const data = await axios.get(
  //         `http://openlibrary.org/search.json?q=${inputText?inputText:'test'}&page=${pageNumber}`
  //       );
  //       let booksData;
  //       booksData = data.data.docs.slice(0,20).map(item=>item.title.slice(0,12));
  //       console.log(booksData)
  //       filteredData = [... new Set(booksData)].slice(0,10);

  //       console.log('after adding checked prop')
  //       let dataObj = filteredData.map((obj) => {
  //         return {
  //           title: obj,
  //           checked: false,
  //         };
  //       });

  //       setLoading(false);
  //       setChoices(dataObj);

  //     } catch (err) {
  //       console.log(err.message)
  //       //  alert(err)
  //     }
  //   }

  //   fetchData();

  // }, [value, pageNumber]);

  //get random 10 users and add it to available choices
  useEffect(() => {
    if (value) return props.getNextOptions();

    async function fetchData() {
      try {
        //Just pass options to the drag and drop.
        // const data = await axios.get(
        //   `https://randomuser.me/api?page=${pageNumber}&results=20`
        // );
        // let names = data.data.results.map((obj) => obj.name);

        let names = props.data;

        if (names) {
          names.forEach((element) => {
            element.checked = false;
          });

          let dataObj = names.map((obj) => {
            return {
              title: obj.first,
              checked: obj.checked,
            };
          });

          // if(dataObj.length>0)
          // setLoadMore(true);

          // if (choices) setChoices([...choices, ...dataObj]);
          // else

          setChoices(dataObj);
        }
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
      //setChoices(dataObj);
    }

    fetchData();
  }, [props.data, value]);

  const onDragEndHandlerForChoices = (result) => {
    try {
      if (!result) return;

      if (!result.destination) return;

      // if(result.destination?.index === choices.length)
      // return;

      if (result.destination.index === result.source.index) return;

      if (loading) return;

      const items = Array.from(choices);
      const [newItems] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, newItems);

      setChoices(items);
    } catch (err) {
      console.log(err.message);
    }
  };

  let transferToRight = () => {
    //get all checked and unchecked of choices

    let checkedArray = Array.from(choices).filter(
      (obj) => obj.checked === true
    );
    let unCheckedArray = Array.from(choices).filter(
      (obj) => obj.checked === false
    );

    setChoices(unCheckedArray);

    //set checked to false and add it to chosen
    checkedArray = checkedArray.map((obj) => {
      obj.checked = false;

      return obj;
    });

    setChoicesCount((choicesCount) => choicesCount - checkedArray.length);
    //let newChosen = [].slice(0,20);
    setChosen([...checkedArray,...chosen]);
  };

  let transferToLeft = () => {
    //get all checked and unchecked of choices

    let checkedArray = Array.from(chosen).filter((obj) => obj.checked === true);
    let unCheckedArray = Array.from(chosen).filter(
      (obj) => obj.checked === false
    );

    setChosen(unCheckedArray);

    //set checked to false and add it to chosen
    checkedArray = checkedArray.map((obj) => {
      obj.checked = false;

      return obj;
    });

    setChosenCount((chosenCount) => chosenCount - checkedArray.length);
    setChoices([...checkedArray, ...choices]);
  };

  const onDragEndHandlerForChosen = (result) => {
    if (loading) return;
    if (!result.destination) return;

    const items = Array.from(chosen);
    const [newItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, newItems);

    setChosen(items);
  };

  const onCheckedChoicesHandler = (e) => {
    let newArray = Array.from(choices).map((obj) => {
      if (obj.title === e.target.name) obj.checked = !obj.checked;

      return obj;
    });

    if (e.target.checked) setChoicesCount(choicesCount + 1);
    else setChoicesCount(choicesCount - 1);

    setChoices(newArray);
  };

  const onCheckedChosenHandler = (e) => {
    let newArray = Array.from(chosen).map((obj) => {
      if (obj.title === e.target.name) obj.checked = !obj.checked;

      return obj;
    });

    if (e.target.checked) setChosenCount(chosenCount + 1);
    else setChosenCount(chosenCount - 1);

    setChosen(newArray);
  };

  const updateAllChoices = (e) => {
    let newArray = null;
    if (e.target.checked) {
      newArray = Array.from(choices).map((obj) => {
        obj.checked = true;
        return obj;
      });
    } else {
      newArray = Array.from(choices).map((obj) => {
        obj.checked = false;
        return obj;
      });
    }

    if (e.target.checked) {
      // allCheckBox.current.checked = false;

      setChoicesCount(newArray.length);
    } else setChoicesCount(0);

    setChoices(newArray);
  };

  const updateAllChosen = (e) => {
    let newArray = null;
    if (e.target.checked) {
      newArray = Array.from(chosen).map((obj) => {
        obj.checked = true;
        return obj;
      });
    } else {
      newArray = Array.from(chosen).map((obj) => {
        obj.checked = false;
        return obj;
      });
    }

    if (e.target.checked) {
      setChosenCount(newArray.length);
    } else setChosenCount(0);

    setChosen(newArray);
  };

  return (
    <div className={classes.dragContainer}>
      <div className={classes.dndContainer}>
        <div>
          <InputField
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <DragDropContext
            onDragEnd={onDragEndHandlerForChoices}
            isDropDisabled={loading}
          >
            <div className={classes.allSection}>
              <div>
                <GreenCheckbox
                  onChange={updateAllChoices}
                  checked={
                    choicesCount === choices.length && choices.length > 0
                  }
                />
                <label>Choices</label>
              </div>
              <p>
                {choicesCount}/{choices.length} selected
              </p>
            </div>

            <div className={classes.checkboxes}>
              <Droppable droppableId={uuid()}>
                {(provided) => (
                  <div>
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {choices.map((choice, index) => {
                        return (
                          <Draggable
                            draggableId={choice.title}
                            key={choice.title + index}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                key={index}
                                className={classes.checkboxContainer}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <GreenCheckbox
                                  className={classes.checkbox_style}
                                  checked={choice.checked}
                                  name={choice.title}
                                  onChange={onCheckedChoicesHandler}
                                  // inputProps={{
                                  //   "aria-label": "secondary checkbox",
                                  // }}
                                />
                                {choices.length === index + 1 ? (
                                  <label ref={lastOption}>{choice.title}</label>
                                ) : (
                                  <label>{choice.title}</label>
                                )}
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>

        <div className={classes.btnContainer}>
          <Button
            className={classes.greenButton}
            variant="contained"
            disabled={!choicesCount}
            onClick={transferToRight}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            className={classes.greenButton}
            variant="contained"
            disabled={!chosenCount}
            onClick={transferToLeft}
          >
            <ChevronLeftIcon />
          </Button>

          {loading ? <p>Loading...</p> : ""}
        </div>

        <div>
          <InputField/>
          <DragDropContext
            onDragEnd={onDragEndHandlerForChosen}
            onDragUpdate={dragUpdate}
          >
            <div className={classes.allSection}>
              <div>
                <GreenCheckbox
                  //inputProps={{ "aria-label": "secondary checkbox" }}
                  onChange={updateAllChosen}
                  checked={
                    chosenCount === chosen.length && chosen.length
                      ? true
                      : false
                  }
                />
                <label>Chosen</label>
              </div>
              <p className="count-label">
                {chosenCount}/{chosen.length} selected
              </p>
            </div>
            <div className={classes.checkboxes}>
              <Droppable droppableId={uuid()}>
                {(provided) => (
                  <div>
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {chosen.map((chosen, index) => {
                        return (
                          <Draggable
                            draggableId={chosen.title}
                            key={chosen.title}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                key={index}
                                className={classes.checkboxContainer}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <GreenCheckbox
                                  className={classes.checkbox_style}
                                  checked={chosen.checked}
                                  name={chosen.title}
                                  onChange={onCheckedChosenHandler}
                                  // inputProps={{
                                  //   "aria-label": "primary checkbox",
                                  // }}
                                />
                                <label>{chosen.title}</label>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default SelectOptions;
