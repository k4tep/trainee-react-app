import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MyInput } from '../input/MyInput';
import { MyButton } from '../button/MyButton';
import { MyPost } from '../card/MyPost';
import { PopUp } from '../popup/PopUp';
import { PopUpInputList } from '../popup/Popup-list-inputs';
import { CharacterInfo } from '../popup/PopUpInfo';
import { fetchCharacter } from '../../store/characters-slice';
import { removeUser } from '../../store/profile-slice';
import '../../styles/App.css';

export function PostPage() {
    const postsList = useSelector((state) => state.characters.list);
    const pages = useSelector((state) => state.characters.pages);
    const { status, error } = useSelector((state) => state.characters);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const search = React.createRef();
    const [sortMode, setSort] = useState();
    const [field, setField] = useState();
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({});
    const [regExp, setRegExp] = useState('');
    const [modalInfo, setModalInfoVisible] = useState(false);
    const [modalAdd, setModalAddVisible] = useState(false);

    // async function getListCharacters(curPage, curRegExp, curLimit, curSort, curField) {
    //     setLoading(true);
    //     const data = await getCharacters(curPage, curRegExp, curLimit, curSort, curField);
    //     if (data.error) {
    //         setError(data.error);
    //     } else {
    //         for (let index = 0; index < data.docs.length; index++) {
    //             if (!data.docs[index].image) {
    //                 data.docs[index].image = {
    //                     link: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png'
    //                 };
    //             }
    //         }
    //         setPosts(data.docs);
    //         setPages(pagesCount(data.pages));
    //         setLoading(false);
    //     }
    // }

    useEffect(() => {
        dispatch(fetchCharacter({ page, regExp, limit, sortMode, field }));
    }, [page, regExp, limit, sortMode, field]);

    function getIndex(id) {
        let textInfo = postsList.find((post) => {
            if (post._id === id) {
                return post;
            }
        });
        setInfo(textInfo);
    }
    const body = document.getElementById('body');

    if (modalAdd || modalInfo) {
        body.classList.add('body');
    } else {
        body.classList.remove('body');
    }

    return (
        <div
            className={
                postsList === [] || error || status === 'loading'
                    ? 'container fullscreen'
                    : 'container'
            }
        >
            <PopUp visible={modalAdd} setVisible={setModalAddVisible}>
                <PopUpInputList open={modalAdd} create={true} setVisible={setModalAddVisible} />
            </PopUp>
            <PopUp visible={modalInfo} setVisible={setModalInfoVisible}>
                <CharacterInfo info={info} />
            </PopUp>
            <div className="App">
                <div className="bar">
                    <MyInput
                        onBlur={(e) => {
                            if (e.target.value) {
                                localStorage.setItem('search', e.target.value);
                            }
                        }}
                        placeholder="Search..."
                        list="SearchInput"
                        ref={search}
                    />
                    <datalist id="SearchInput">
                        <option>{localStorage.getItem('search')}</option>
                    </datalist>
                    <MyButton
                        onClick={() => {
                            if (search.current.value != '') {
                                setRegExp(search.current.value);
                                setPage(1);
                            } else {
                                setRegExp('');
                            }
                        }}
                    >
                        Search
                    </MyButton>
                    <MyButton onClick={() => setModalAddVisible(true)}>New character </MyButton>
                    <p className="p">Post limit</p>
                    <select
                        defaultValue={50}
                        className="select"
                        onChange={(e) => setLimit(e.target.value)}
                    >
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </select>
                    <p className="p">Sort type</p>
                    <select
                        defaultValue="Descending"
                        className="select"
                        onChange={(e) => setSort(e.target.value.toLocaleLowerCase())}
                    >
                        <option>Descending</option>
                        <option>Ascending</option>
                    </select>
                    <p className="p">Sort field</p>
                    <select
                        defaultValue="ID"
                        className="select"
                        onChange={(e) => setField(e.target.value.toLocaleLowerCase())}
                    >
                        <option>ID</option>
                        <option>Height</option>
                        <option>Birth</option>
                        <option>Death</option>
                        <option>Gender</option>
                        <option>Race</option>
                        <option>Name</option>
                    </select>
                    <MyButton
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(removeUser());
                            // localStorage.setItem('token', '');
                            navigate('/login');
                        }}
                    >
                        LogOut
                    </MyButton>
                </div>
                {error ? (
                    <h1 className="h1">Error: {error}</h1>
                ) : status === 'loading' ? (
                    <h1 className="h1">Loading...</h1>
                ) : postsList != [] ? (
                    <div>
                        <div>
                            {postsList.map((post) => (
                                <MyPost
                                    name={post.name}
                                    race={post.race}
                                    img={post.image ? post.image.link : null}
                                    key={post._id}
                                    id={post._id}
                                    onContextMenu={(event) => {
                                        getIndex(post._id);
                                        setModalInfoVisible(true);
                                        event.preventDefault();
                                    }}
                                />
                            ))}
                        </div>
                        <div className="page_container">
                            {pages.map((p) => (
                                <span
                                    onClick={() => {
                                        setPage(p);
                                    }}
                                    className={page === p ? 'page page_current' : 'page'}
                                    key={p}
                                >
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <h1>No posts</h1>
                )}
            </div>
        </div>
    );
}
