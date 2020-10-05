import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import List from "./components/list";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Fade from "react-reveal/Fade";

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
const WEEKDAYS_SHORT = ["Do", "Lu", "Ma", "MI", "Ju", "Vi", "Sa"];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.deleteDay = this.deleteDay.bind(this);
    this.state = {
      selectedDay: [],
      dataChild: null,
      categorias: [
        { categoria: "Trabajo", color: "#2ECC40" },
        { categoria: "Vacaciones", color: "#FF4136" },
      ],
      lastColor: [],
    };
  }

  getData(datax, categoria) {
    const { selectedDay, categorias, lastColor } = this.state;
    categorias.push(categoria);
    console.log(categorias);
    selectedDay.push(datax);
    lastColor.push(
      this.state.categorias[this.state.categorias.length - 1].color
    );
    this.setState({
      selectedDay,
      categorias,
      lastColor,
    });
    console.log(lastColor);
    console.log(selectedDay);
  }

  deleteDay(day) {
    var joined = this.state.selectedDay.filter((dia) => dia !== day);
    this.setState({
      selectedDay: joined,
    });
  }

  render() {
    const colorSelectedDay = this.state.selectedDay[
      this.state.selectedDay.length - 1
    ];
    const colorz = this.state.categorias[this.state.categorias.length - 1]
      .color;

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
        <Navbar />
        <Fade>
          <div className="appwrapper">
            <div className="dayPickerStyle">
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
              <List
                selectedDay={this.state.selectedDay}
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
