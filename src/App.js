import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import List from "./components/list"
import Navbar from "./components/navbar"
import "./App.css";
import Footer from "./components/Footer";
import Fade from "react-reveal/Fade";

//traduccion de meses y dias

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const WEEKDAYS_LONG = [
  "Domingo",
  "Lunes",
  "Martes",
  "Mercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];
const WEEKDAYS_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.deleteDay = this.deleteDay.bind(this);
    this.state = {
      selectedDay: [],
      dataChild: null,
      categorias: [
        { categoria: "Trabajo", color: "royalblue" },
        { categoria: "Vacaciones", color: "firebrick" },
      ],
      lastColor: [],
      todosLosDias:[],
      diasIguales:[],
    };
  }

  //mantengo el color del dia si elijo otro dia. 
  componentDidMount(){
    const deiz = document.querySelectorAll('.DayPicker-Day');
    deiz.forEach((dia) => {
      this.state.todosLosDias.push(dia);
    });
  }

  //loopeo los dias, checkeo si el dia loopeado fue seleccionado por el usuario, y si fue seleccionado, lo pinto del color de la categoria donde viene la fecha seleccionada
  componentDidUpdate(){
    const diaSeleccionado = []
    const dias = this.state.todosLosDias;
    dias.forEach(dia => {
      if (dia.classList.contains('DayPicker-Day--selected') && !dia.classList.contains('DayPicker-Day--outside')){
        diaSeleccionado.push(dia);
        diaSeleccionado.forEach(seleccionado =>{
          if(!seleccionado.classList.contains('royalblue') && 
          !seleccionado.classList.contains('firebrick') && 
          !seleccionado.classList.contains('forestgreen') && 
          !seleccionado.classList.contains('sienna') &&
          !seleccionado.classList.contains('deeppink')){
            seleccionado.classList.add( this.state.lastColor[this.state.lastColor.length - 1] );
          }
        })
      }
    });
  }

  


  //recibo la data del componente hijo List
  getData(datax, categoria) {
    const { selectedDay, categorias, lastColor } = this.state;
    categorias.push(categoria);
    selectedDay.push(datax);
    lastColor.push(
      this.state.categorias[this.state.categorias.length - 1].color
    );
    this.setState({
      selectedDay,
      categorias,
      lastColor,
    });
  }

//elimino el dia segun el id que me manda el boton de eliminar del componente list
  deleteDay(index) {
    this.setState((prevState) => ({
      selectedDay: [...prevState.selectedDay.slice(0,index), ...prevState.selectedDay.slice(index+1)],
      lastColor: [...prevState.lastColor.slice(0,index), ...prevState.lastColor.slice(index+1)],
    }))
  }

  render() {
    document.title = 'Calendaro Latech'

    const alreadySeen = [];

    const diasIguales = [];

    this.state.selectedDay.forEach(str => alreadySeen[str] ? diasIguales.push(str) : alreadySeen[str] = true);

    const modifiers = {
      birthday: diasIguales,
    };

    return (
      <div>
        {/* estilo para que no pinte los dias desabilitados */}
        <style>{`
        .DayPicker-Day--outside{
          color: #8B9898 !important;
          background-color:transparent !important;
          background: transparent !important;
        }
        .DayPicker-Day--birthday{
          background: linear-gradient(90deg, ${this.state.lastColor} 80%, ${this.state.lastColor} 25%);
        }
        `}</style>
        <Navbar />
        <Fade>
          <div className="appwrapper">
            <div className="dayPickerStyle">
               {/* renderizo el almanaque */}
              <DayPicker
                month={new Date(2020, 0)}
                numberOfMonths={12}
                selectedDays={this.state.selectedDay}
                onDayClick={this.handleDayClick}
                canChangeMonth={false}
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
                modifiers={modifiers}
              />
            </div>
            <div>
              {/* recibo datos del componente list */}
              <List
                getData={this.getData}
                deleteDay={this.deleteDay}
              />
            </div>
          </div>
        </Fade>
        <Footer />
      </div>
    );
  }
}
