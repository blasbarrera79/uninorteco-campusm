import React from 'react';
import { Container, Divider, Typography, Link, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { LanguageRounded } from '@material-ui/icons';

const DatabaseComponent = () => {

  const dividerWithText = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
  };

  const dividerLine = {
    borderBottom: '3px',
    flexGrow: 1,
  };

  const dividerText = {
    margin: '0 10px',
    textTransform: 'uppercase',
  };

  const linkStyle = {
    color: 'black',
    '&:hover': {
      color: 'blue',
    },
  };

  return (
    <Container>
      <div style={dividerWithText}>
        <Divider style={{ ...dividerLine, marginRight: 5 }} />
        <Typography variant="body1" style={dividerText}>
          Bases de datos
        </Typography>
        <Divider style={{ ...dividerLine, marginLeft: 5 }} />
      </div>
      <Typography variant="body1" align="left" paragraph>
        Aprovecha tu cuenta Uninorte para poder acceder a las bases de datos o revistas académicas y leer artículos académicos. Normalmente estas te pedirían membresía o que pagues por el artículo.
      </Typography>
      <Typography variant="body1" align="right" paragraph>
        <Link href="https://uninorte.libguides.com/az.php" target="_blank" rel="noopener" style={linkStyle}>
          Ir a las bases de datos <strong>{'>'}</strong>
        </Link>
      </Typography>
      <div style={dividerWithText}>
        <Divider style={{ ...dividerLine, marginRight: 5 }} />
        <Typography variant="body1" style={dividerText}>
          Otros servicios
        </Typography>
        <Divider style={{ ...dividerLine, marginLeft: 5 }} />
      </div>
      <List>
        <ListItem button component="a" href="https://primo-tc-na01.hosted.exlibrisgroup.com/primo-explore/search?search_scope=uninorte_completo&vid=UNINORTE&lang=es_CO" target="_blank" rel="noopener">
          <ListItemIcon>
            <LanguageRounded />
          </ListItemIcon>
          <ListItemText primary="SIBILA+" />
          <strong>{'>'}</strong>
        </ListItem>
        <ListItem button component="a" href="http://ezproxy.uninorte.edu.co:2048/login?url=http://sfxna11.hosted.exlibrisgroup.com/57UNINORTE/az?lang=spa" target="_blank" rel="noopener">
          <ListItemIcon>
            <LanguageRounded />
          </ListItemIcon>
          <ListItemText primary="AtoZ" />
          <strong>{'>'}</strong>
        </ListItem>
        <ListItem button component="a" href="http://manglar.uninorte.edu.co/" target="_blank" rel="noopener">
          <ListItemIcon>
            <LanguageRounded />
          </ListItemIcon>
          <ListItemText primary="Repositorio Digital" />
          <strong>{'>'}</strong>
        </ListItem>
      </List>
    </Container>
  );
};

export default DatabaseComponent;
