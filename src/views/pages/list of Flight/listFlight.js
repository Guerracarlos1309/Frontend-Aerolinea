import React from 'react';
import {CDateRangePicker} from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    
  
} from '@coreui/react';

const listFlight = () => {
    const flights = [
        {
          id: 1,
          departure: 'New York (JFK)',
          arrival: 'London (LHR)',
          flightNumber: 'BA178',
          date: '2023-06-15',
          arrivalTime: '8:00',
          arrivalDeparture: '18:00',
        },
        {
          id: 2,
          departure: 'Los Angeles (LAX)',
          arrival: 'Tokyo (NRT)',
          flightNumber: 'JL015',
          date: '2023-06-15',
          arrivalTime: '10:00',
          arrivalDeparture: '03:00',
        },
        {
          id: 3,
          departure: 'Paris (CDG)',
          arrival: 'Dubai (DXB)',
          flightNumber: 'EK032',
          date: '2023-06-16',
          arrivalTime: '10:00',
          arrivalDeparture: '22:00',
        },
        {
          id: 4,
          departure: 'Sydney (SYD)',
          arrival: 'Singapore (SIN)',
          flightNumber: 'SQ232',
          date: '2023-06-16',
          arrivalTime: '14:00',
          arrivalDeparture: '19:00',
        },
        {
          id: 5,
          departure: 'Madrid (MAD)',
          arrival: 'São Paulo (GRU)',
          flightNumber: 'IB6824',
          date: '2023-06-17',
          arrivalTime: '20:00',
          arrivalDeparture: '07:00',
        },
      ]

      return (
        
      <div className="row">
        
  {/* <div className="col-lg-6">
    <CDateRangePicker
      startDate="2022/08/03"
      endDate="2022/08/17"
      label="Date range"
      locale="en-US"
      inputDateParse={(date) => parse(date, 'MMMM dd, yyyy', new Date())}
      inputDateFormat={(date) => format(new Date(date), 'MMMM dd, yyyy')}
    />
  </div>
  <div className="col-lg-6">
    <CDateRangePicker
      startDate="2022/08/03"
      endDate="2022/08/17"
      label="Rango de fechas"
      locale="es-ES"
      placeholder={['Fecha de inicio', 'Fecha de fin']}
      inputDateParse={(date) => parse(date, 'yyyy MMMM dd', new Date(), { locale: es })}
      inputDateFormat={(date) => format(new Date(date), 'yyyy MMMM dd', { locale: es })}
    />
  </div> */}


        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Lista de Vuelos</strong>
              </CCardHeader>
              <CCardBody>
                <CTable hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Aeropuerto de Salida</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aeropuerto de Llegada</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Número de Vuelo</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Fecha de Salida</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hora de Salida</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Hora de llegada</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {flights.map((flight) => (
                      <CTableRow key={flight.id}>
                        <CTableDataCell>{flight.departure}</CTableDataCell>
                        <CTableDataCell>{flight.arrival}</CTableDataCell>
                        <CTableDataCell>{flight.flightNumber}</CTableDataCell>
                        <CTableDataCell>{flight.date}</CTableDataCell>
                        <CTableDataCell>{flight.arrivalTime}</CTableDataCell>
                        <CTableDataCell>{flight.arrivalDeparture}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        
      </div>
      )
}

export default listFlight