import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import List from "./components/list";
import "./App.css";
import Navbar from "./components/navbar";
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
        { categoria: "Vacaciones", color: "darkred" },
      ],
      lastColor: [],
      diasColor:[],
      diaSeleccionado: [],
    };
  }

  //mantengo el color del dia si elijo otro dia. 
  // TODO: resolver bug que al agregar un nuevo dia en una distinta categoria en el componente list se pisan las categorias. 
  // esto se debe a que queda guardado en selectedDay la fecha en la categoria seleccionada anteriormente en el componente list y pintandolas del ultimo color seleccionado

  componentDidMount(){
    const dias = document.querySelectorAll('.DayPicker-Day');
    dias.forEach(dia => {
      this.state.diasColor.push(dia);
    });
  }

  componentDidUpdate(){
    const dias = this.state.diasColor;
    dias.forEach(dia => {
      if (dia.classList.contains('DayPicker-Day--selected') && !dia.classList.contains('DayPicker-Day--outside')){
        this.state.diaSeleccionado.push(dia);
        dia.classList.add( this.state.categorias[this.state.categorias.length - 1].color );
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
      selectedDay: [...prevState.selectedDay.slice(0,index), ...prevState.selectedDay.slice(index+1)]
    }))
  }

  render() {
    document.title = 'Calendaro Latech'
    //renderizado de colores del almanaque
    const colorSelectedDay = this.state.selectedDay[this.state.selectedDay.length - 1];

    const colorz = this.state.categorias[this.state.categorias.length - 1].color;

    const modifiers = {
      coloredDay: colorSelectedDay,
    };

    const modifiersStyles = {
      coloredDay: {
        backgroundColor: colorz,
      },
    };

    

    return (
      <div>
        {/* estilo para que no pinte los dias desabilitados */}
        <style>{`
        .DayPicker-Day--outside{
          color: #8B9898 !important;
          background-color:transparent !important;
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
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
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
