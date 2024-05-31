import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TabsComponent from './TabsComponent';
import Tab1ListComponent from '../Pages/page-one/tab-one/Tab1ListComponent';
import Tab2ListComponent from '../Pages/page-one/tab-two/Tab2ListComponent';
import PartialPageComponent from '../Pages/page-two/PartialPageComponent';
import { fetchUserData, fetchUserTerms, fetchUserGrades } from "../utils/apiUtils";

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 64,
  },
});

const Home = () => {
  const classes = useStyles();
  const [subjectsGrades, setSubjectsGrades] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await fetchUserData();
        setUser(username);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        if (user) {
          const termsResponse = await fetchUserTerms(user);
          setSelectedTerm(termsResponse[0]?.PERIODO || '');
        }
      } catch (err) {
        console.error(err);
      }
      
    };
  
    fetchTerms();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsGradesResponse = await fetchUserGrades(selectedTerm, user);
        setSubjectsGrades(subjectsGradesResponse);
      } catch (err) {
        console.error(err);
      }
    };

    if (selectedTerm && user) {
      fetchData();
    }
  }, [selectedTerm, user]);

  return (
    <Router>
      <div className={classes.root}>
        <TabsComponent />;
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<Tab1ListComponent materias={subjectsGrades} />} />
          <Route path="/tab2" element={<Tab2ListComponent materias={subjectsGrades} />} />
          <Route path="/partial" element={<PartialPageComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
