import React from 'react';
import classes from './PopUp.module.css';

export function CharacterInfo(props) {
    const info =
        props && props.info
            ? props.info
            : {
                  name: 'unknown',
                  gender: 'unknown',
                  race: 'unknown',
                  birth: 'unknown',
                  image: { link: 'https://cdn.theatlantic.com/media/mt/science/cat_caviar.jpg' },
                  height: 'unknown',
                  hair: 'unknown',
                  spouse: 'none',
                  wikiUrl: 'wiki.org'
              };
    return (
        <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
            <div>
                <img src={info.image ? info.image.link : null} className={classes.img}></img>
            </div>
            <div>
                <h1 className={classes.h1}>{info.name}</h1>
                <p>{info.gender}</p>
                <p>Race: {info.race}</p>
                <p>Birth: {info.birth || 'unknown'}</p>
                <p>Height: {info.height || 'unknown'}</p>
                <p>Hair: {info.hair || 'unknown'}</p>
                <p>Spouse: {info.spouse || 'unknown'}</p>
                <a href={info.wikiUrl} className={classes.a}>
                    More info on Wiki
                </a>
            </div>
        </div>
    );
}
