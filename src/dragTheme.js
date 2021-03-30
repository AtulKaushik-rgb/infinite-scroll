import { makeStyles,withStyles } from '@material-ui/core/styles';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField"

const GreenCheckbox = withStyles({

  root: {
    
    '&$checked': {
      color: 'green',
      
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const InputField = withStyles({
  root: {
    width:'202px',

    '&:focus': {
      color: 'green',
      
    },
  }
})((props) => <TextField id="outlined-search" label="Search by board name" variant='standard' type="search" {...props} />);

const useStyles = makeStyles({

//   root: {
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },


  checkboxContainer : {
    display:'flex',
    flexDirection:'row',
    //justifyContent: 'flex-end',
    alignItems:'center',
    listStyle:'none',
    backgroundColor:'none',
    width:'inherit',
    height:'calc(10vh - 1px)',
    borderBottom:'1px solid rgb(224, 224, 224)',
    ':last-child': {
      borderBottom:'none'
    },
  },

  

  greenButton: {
    margin:'5px 0px',
    backgroundColor: 'green',
    color: '#000',
    '&:enabled': {
      backgroundColor: 'green',
      color: '#000',
      '&:hover': {
        backgroundColor: 'green',
        color: '#000'
    }
  }
},

  dndContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    listStyle:'none',
    //height:'auto',
  },

  btnContainer:{
      display: 'flex',
      flexDirection: 'column',
      margin:'0px 40px',
  },
  transferButton:{
      margin: '5px 0px',
  },
  
  navContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'none',
  },
  allSection:{
      width: '200px',
      display: 'flex',
      backgroundColor: 'none',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'flex-start',
      border: '1px solid rgb(224, 224, 224)',
      borderBottom:'none',
      '& p':{
               margin: '0px auto',
               fontSize: '14px'
      },
      '& div':{
           marginLeft:'40px',
         } 
  },
//   countLabel{
//       margin: 0px auto;
//       font-size: 14px;
//   },
//   /* .all-section p{
//       margin: 0px auto;
//       font-size: 14px;
//   } */
//   /* .all-section div{
//     margin-left:20px
// } */
  checkboxes:{
      backgroundColor: 'none',
      display: 'grid',
      gridTemplateRows: 'repeat(7, 1fr)',
      width: '15%',
      minWidth:'200px',
      height:"70vh",
      border: '1px solid rgb(224, 224, 224)',
      //borderBottom:'none',
      overflowY:'scroll',
      scrollbarWidth:'none',
      '& ul':{
        margin:0,
        padding:0
      },
      '&::-webkit-scrollbar': {
        width: 0,
        height: 0
      },
      '-ms-overflow-style': 'none'
      
      
    //   -ms-overflow-style: none;
    //   .container {
    //     overflow-y: scroll;
    //     scrollbar-width: none; /* Firefox */
    //     -ms-overflow-style: none;  /* Internet Explorer 10+ */
    // }
    // .container::-webkit-scrollbar { /* WebKit */
    //     width: 0;
    //     height: 0;
    // }
      },

  // container:{
  //     display: 'flex',
  //     flexDirection: 'column',
  //     justifyContent: 'center',
  //     alignItems: 'flex-start',
  //     backgroundColor: 'none',
  //     width: 'auto',
      
  //     '& li':{
  //       backgroundColor: 'none',
  //       width: 'auto',
  //       display: 'flex',
  //       flexDirection: 'row',
  //       alignItems: 'center',
  //       justifyContent: 'flex-start'
  //   }
  // },
  checkbox_style :{
   
      //margin:'0px 5px',
      //marginRight:'10px',
      //checked
  },
//container  
//   /* ul li label{
//       margin: 0px 15px;
//   } */
//   titleLabel{
//     margin: 0px 15px;
//   },
checkbox_color:{
  color:'red'
},
  dragContainer:{
    /* border-bottom: 1px solid black; */
    //margin: '0px auto',
    //width: '600px'
},
 loader:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
} 

});



export default useStyles;
export {
  GreenCheckbox,InputField
}