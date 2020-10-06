import React from "react";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "./list.css";
//localization con moment.js
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";

import "moment/locale/es";



export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.addDiasObj = this.addDiasObj.bind(this);
    this.myRef = React.createRef();
    this.state = {
      selectedDay: undefined,
      dias: [],
      diasObj: [],
      categoriasObj: [
        {  categoria: "Trabajo", color: "royalblue" },
        {  categoria: "Vacaciones", color: "darkred" },
      ],
    };
  }


  //agregado de dias con su respectivo id y categoria
  addDiasObj(dias, categoria) {
    if(dias === undefined){
      alert("Selecciona un día para continuar")
    }else{
      dias = dias.toLocaleDateString();
      this.setState({
        diasObj: [...this.state.diasObj, { id: this.state.diasObj.length ,dia: dias, categoria: categoria }],
      });
    }
  }

  //guardo el dia seleccionado en selectedDay en formato Date
  handleDayChange(selectedDay) {
    this.setState({
      selectedDay,
    });
  }

  //---lista de categorias---
  //borrado de dia 
  handleDelete(dia) {
    this.setState({
      diasObj: this.state.diasObj.filter((_, i) => i !== dia.id)
    });
  }

  //agregado de categorias y colores a categoriasObj
  handleFormSubmitObj = (e) => {
    e.preventDefault();
    if(e.target.categoria.value === ""){
      alert("El campo Nombre de la categoría esta vacío. Asigne un nombre y luego continúe");
    }else{
      this.setState({
        categoriasObj: [
          ...this.state.categoriasObj,
          { categoria: e.target.categoria.value, color: e.target.colors.value },
        ],
      });
      e.target.categoria.value = "";
    }
  };


  render() {
    const { selectedDay } = this.state;

    return (
      <div className="categories-wrapper">
        <div className="categories">
          {/* formulario de categorias */}
          <div className="categories-title">AGREGAR CATEGORÍA</div>
          <form onSubmit={this.handleFormSubmitObj}>
            <label>NOMBRE </label>
            <input type="text" name="categoria" />
            <label>COLOR </label>
            <select name="colors" id="colors">
              {/* TODO: mejorar colores y agregar opcion para agregar colores con un colorpicker hexadecimal */}
              <option value="royalblue">Azul</option>
              <option value="darkred">Rojo</option>
              <option value="forestgreen">Verde</option>
              <option value="deeppink">Violeta</option>
            </select>
            <button type="submit">Agregar</button>
          </form>
        </div>
        <div className="categories-list-wrapper">
           {/* listado de categorias de usuario */}
          <div className="categories-title">TUS CATEGORÍAS</div>
          <ul className="categories-loop">
            {/* loopeo sobre el listado de categorias y colores y asigno los colores correspondientes a la categoria */}
            {this.state.categoriasObj.map((categoria,i) => (
              <li ley={i} className="categories-list" style={{ color: categoria.color }}>
                <span className="categories-title-loop">
                  {categoria.categoria}
                </span>
                 {/* seleccionador de dias */}
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="L"
                  placeholder={`Elija la fecha a agendar`}
                  dayPickerProps={{
                    locale: "es",
                    localeUtils: MomentLocaleUtils,
                  }}
                  value={this.selectedDay}
                  onDayChange={this.handleDayChange}
                />
                 {/* agrego el dia seleccionado del daypicker al almanaque y al listado de fechas de las categorias  */}
                <button
                  onClick={() => {
                    this.props.getData(selectedDay, categoria, categoria.color);
                    this.addDiasObj(
                      selectedDay,
                      categoria
                    );
                  }}
                >
                  Agendar
                </button>

                <ul>
                   {/* listado de fechas en la categoria correspondiente */}
                  {this.state.diasObj.map((diaObj,i) => (
                    <div key={i}>
                      {diaObj.categoria  ===  categoria ? (
                        <li>
                          {diaObj.dia}
                           {/* elimino la categoria */}
                          <button
                            onClick={() => {
                              this.handleDelete(diaObj);
                              this.props.deleteDay(diaObj.id);
                            }}
                          >
                            X
                          </button>
                        </li>
                      ) : null}
                    </div>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
