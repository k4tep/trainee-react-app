import React, { useEffect, useRef, useState } from 'react';
import { MyInput } from '../input/MyInput';
import { MyButton } from '../button/MyButton';
import { useDispatch } from 'react-redux';
import classes from './PopUp.module.css';
// import { putCharacter } from '../../request/put-character';
import { addCharacter } from '../../store/characters-slice';
import { updateCharacter } from '../../store/character-slice';
import { addImage } from '../../request/add-image';

export function PopUpInputList({
    idInfo = {
        _id: '',
        height: '',
        race: '',
        gender: '',
        birth: '',
        spouse: '',
        death: '',
        realm: '',
        hair: '',
        imageId: '',
        image: '',
        name: '',
        wikiUrl: ''
    },
    setUpdate,
    setVisible,
    open,
    create = false
}) {
    const deleteFile = useRef();
    const dispatch = useDispatch();
    const [info, setNewInfo] = useState(idInfo);
    useEffect(() => setNewInfo(idInfo), [open]);
    const raceList = [
        'Human',
        'Elf',
        'Hobbit',
        'Orc',
        'Dragons',
        'Ainur',
        'Great Eagles',
        'Vampire',
        'Stone-trolls',
        'Ents',
        'Half-elven',
        'Uruk-hai',
        'Balrog',
        'Great Spiders'
    ];
    const genderList = ['Male', 'Female', 'NaN'];

    return (
        <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
            <p>Name</p>
            <MyInput
                placeholder="Name"
                value={info.name}
                onChange={(e) => setNewInfo({ ...info, name: e.target.value })}
            ></MyInput>
            <p>Race</p>
            <select
                className={classes.select}
                value={info.race}
                onChange={(e) => setNewInfo({ ...info, race: e.target.value })}
            >
                {raceList.reduce((acc, curr, index, array) => {
                    const tmp =
                        curr === info.race ? (
                            <option defaultChecked key={curr.length + curr}>
                                {curr}
                            </option>
                        ) : (
                            <option key={curr.length + curr}>{curr}</option>
                        );

                    acc.push(tmp);
                    if (index === array.length - 1 && info && info.race) {
                        if (!array.includes(info.race)) {
                            acc.push(
                                <option selected key={info.race.length + info.race}>
                                    {info.race}
                                </option>
                            );
                        }
                    }
                    return acc;
                }, [])}
            </select>
            <p>Gender</p>
            <div className={classes.div}>
                {genderList.map((item) => (
                    <div key={`${item}-picker`}>
                        <MyInput
                            className={classes.input}
                            type="radio"
                            name="gender"
                            value={item}
                            checked={info.gender ? info.gender === item : item === 'NaN'}
                            onChange={(e) => setNewInfo({ ...info, gender: e.target.value })}
                        ></MyInput>
                        {item}
                    </div>
                ))}
            </div>
            <div className={classes.imgDiv}>
                <MyInput
                    ref={deleteFile}
                    type="file"
                    accept="image/*,image/jpeg"
                    onChange={async (e) => {
                        const formData = new FormData();
                        formData.append('image', e.target.files[0]);
                        const data = await addImage(formData);
                        setNewInfo({ ...info, imageId: data.data.filename, image: data.data });
                    }}
                />
                <img
                    className={info.imageId ? classes.img : classes.imgHide}
                    src={info.imageId ? info.image.link : null}
                ></img>
            </div>

            <p>Realm</p>
            <MyInput
                placeholder="Realm"
                value={info.realm}
                onChange={(e) => setNewInfo({ ...info, realm: e.target.value })}
            ></MyInput>
            <hr></hr>
            <p>Height</p>
            <MyInput
                placeholder="Height"
                type="number"
                min="110"
                max="230"
                value={info.height}
                onChange={(e) => setNewInfo({ ...info, height: e.target.value })}
            ></MyInput>
            <p>Hair</p>
            <MyInput
                placeholder="Hair"
                value={info.hair}
                onChange={(e) => setNewInfo({ ...info, hair: e.target.value })}
            ></MyInput>
            <hr></hr>
            <p>Birth</p>
            <MyInput
                placeholder="Birth"
                value={info.birth}
                onChange={(e) => setNewInfo({ ...info, birth: e.target.value })}
            ></MyInput>
            <p>Death</p>
            <MyInput
                placeholder="Death"
                value={info.death}
                onChange={(e) => setNewInfo({ ...info, death: e.target.value })}
            ></MyInput>
            <hr></hr>
            <p>Spouse</p>
            <MyInput
                placeholder="Spouse"
                value={info.spouse}
                onChange={(e) => setNewInfo({ ...info, spouse: e.target.value })}
            ></MyInput>
            <hr></hr>
            <p>WikiUrl</p>
            <MyInput
                placeholder="WikiUrl"
                type="url"
                value={info.wikiUrl}
                onChange={(e) => setNewInfo({ ...info, wikiUrl: e.target.value })}
            ></MyInput>
            <MyButton
                onClick={() => {
                    if (create) {
                        dispatch(addCharacter(info));
                    } else {
                        dispatch(updateCharacter({ info }));
                        setUpdate(true);
                    }
                    setVisible(false);
                    deleteFile.current.value = '';
                }}
            >
                Done
            </MyButton>
        </div>
    );
}
