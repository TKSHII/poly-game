import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav/Nav'
import Column from '../components/Column/Column'
import SearchGame from '../components/SearchGame/SearchGame'
import {useContext, useEffect, useRef, useState} from "react";
import AddColumn from "../components/AddColumn/AddColumn";
import {Reorder, motion} from "framer-motion";
import AddPopup from "../components/AddPopup/AddPopup";
import AppContext from "../context/AppContext";
import {useMediaQuery} from "react-responsive";


const Home: NextPage = () => {

    const context: any = useContext(AppContext);
    const [searchVisible, setSearchVisible] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [columns, setColumns] = useState(context.values.state.columns);
    const [editMode, setEditMode] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [axis, setAxis] = useState<any>('x')
    const [height, setHeight] = useState('auto')
    const [scroll, setScroll] = useState('hidden')


    const show = (show:boolean) => {
        setSearchVisible(show);
    }


    const showAdd = (show: boolean, edit: boolean) => {
        setAddVisible(show);
        setEditMode(edit);
    }

    const heightVar:any = {
        height: height,
        overflowY: scroll
    }

    useEffect(() => {
        setIsMobile(isTabletOrMobile)
        if(isMobile) {
            setAxis('y')
            setHeight('100vh')
            setScroll('scroll')
        }
        context.showAdd = [addVisible, showAdd];
    }, [context, addVisible, isTabletOrMobile]);

  return (
    <>
      <Head>
          <title>Polygame</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Nav
            css={styles}
            global={global}/>
      </header>
      <main>
            <Reorder.Group
                axis={axis}
                values={columns}
                onReorder={setColumns}
                className={styles.list}>
                    {columns.map((column: any) =>
                                <Column
                                    key={column.id}
                                    column={column}
                                    show={show}
                                    showAdd={(show: boolean) => showAdd}
                                />
                    )}
            </Reorder.Group>
                <AddColumn
                    show={showAdd}/>
          {
              searchVisible
                  ? <SearchGame
                      show={show} />
                  : null
          }
          {
           addVisible
                ?
                   <AddPopup
                       columns={columns}
                       setColumns={setColumns}
                       show={showAdd}
                       editMode={editMode}
                       visible={addVisible}
                   />
                    : null
          }
      </main>
    </>
  )
}

export default Home
