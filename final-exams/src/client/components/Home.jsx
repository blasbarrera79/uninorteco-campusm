import React, {useState,useEffect} from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import SimpleCard from "./Card"
import FinalExamService from "../logic-domain/final-exams-domain"
import { DateTimeService } from "../logic-domain/date-services"
import HeaderComponent from "./HeaderComponent"


const useStyles = makeStyles({
  container: {},
})

export default function Home() {
  const classes = useStyles()
  const [dato, setDato] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const examService = new FinalExamService()
        const groupedExams = await examService.getGroupExamByDate()
        setDato(groupedExams)
        setLoading(false)
      } catch (errorApi) {
        setError(errorApi)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Hubo un error: {error.message}</p>
  }

  return (
    <Container className={classes.container}>
      {Object.keys(dato).map((fecha) => {
        const { day, month, year, dayName } = DateTimeService.formatDate(fecha)
        return (
          <div key={fecha}>
            <HeaderComponent
              day={day}
              month={month}
              year={year}
              dayName={dayName}
            />
            {dato[fecha].map((item) => (
              <SimpleCard
                key={item.DESCRIPCION}
                title={item.DESCRIPCION}
                hour={item.HORA}
                teacher={item.PROFESOR}
                classRoom={item.LUGAR}
              />
            ))}
          </div>
        )
      })}
    </Container>
  )
}
