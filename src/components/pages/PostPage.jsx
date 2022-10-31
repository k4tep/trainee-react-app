import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyInput } from '../input/MyInput';
import { MyButton } from '../button/MyButton';
import { MyPost } from '../card/MyPost';
import { PopUp } from '../popup/PopUp';
import { PopUpInputList } from '../popup/Popup-list-inputs';
import { CharacterInfo } from '../popup/PopUpInfo';
import { getCharacters } from '../../request/get-character';
import { pagesCount } from '../page-count';
import { randomImg } from '../card/random-img';
import '../../styles/App.css';

export function PostPage() {
    const navigate = useNavigate();
    const search = React.createRef();
    const [sort, setSort] = useState();
    const [error, setError] = useState('');
    const [field, setField] = useState();
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState({});
    const [regExp, setRegExp] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalInfo, setModalInfoVisible] = useState(false);
    const [modalAdd, setModalAddVisible] = useState(false);

    async function getListCharacters(curPage, curRegExp, curLimit, curSort, curField) {
        setLoading(true);
        const data = await getCharacters(curPage, curRegExp, curLimit, curSort, curField);
        if (data.error) {
            setError(data.error);
        } else {
            for (let index = 0; index < data.docs.length; index++) {
                if (!data.docs[index].image) {
                    data.docs[index].image = { link: randomImg() };
                }
            }
            setPosts(data.docs);
            setPages(pagesCount(data.pages));
            setLoading(false);
        }
    }

    useEffect(() => {
        getListCharacters(page, regExp, limit, sort, field);
    }, [page, regExp, modalAdd, limit, sort, field]);

    function getIndex(id) {
        let textInfo = posts.find((post) => {
            if (post._id === id) {
                return post;
            }
        });
        setInfo(textInfo);
    }

    return (
        <div className={posts === [] || error || loading ? 'container fullscreen' : 'container'}>
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
                            localStorage.removeItem('token');
                            navigate('/login');
                        }}
                    >
                        LogOut
                    </MyButton>
                </div>
                {error ? (
                    <h1 className="h1">Error: {error}</h1>
                ) : loading ? (
                    <h1 className="h1">Loading...</h1>
                ) : posts != [] ? (
                    <div>
                        <div>
                            {posts.map((post) => (
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
