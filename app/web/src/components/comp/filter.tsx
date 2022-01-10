
import {Block, Sheet, PageContent } from 'framework7-react';
import { useState ,useEffect} from 'react';
import {eventBus} from '../../global';
import { motion } from "framer-motion";

export default (props) => {
    const [filterOn, setFilterOn] = useState(false);
    const [sortByState, setSortByState] = useState(0);
    const [categoryState, setCategoryState] = useState(0);
    const sortby = ["New Product", "Most Expensive", "Cheapest", "A-Z"];
    const [category,setCategory] = useState(["All","Monitor", "Laptop", "Keyboard","Mouse","Projector","Camera"]);

    useEffect(()=>{
        eventBus.on('filter', (e) => {
            setFilterOn(true);
          });
    })
    useEffect(()=>{
        setCategory(props.category);
        setCategoryState(props.categoryState);
    },[props.category,props.categoryState])
    return (
        <Sheet
            swipeToClose
            backdrop
            style={{ height: 'auto' }}
            opened={filterOn}
            onSheetClose={() => {
                setFilterOn(false);
            }}
        >
            <PageContent >
                <Block className="px-6 space-y-2">
                    <div className="text-xl font-semibold text-coolGray-900" style={{ paddingBottom: '1rem' }}>Filter</div>
                    <div className=" flex flex-col space-y-2">
                        <span className="text-base font-medium text-coolGray-900">Sort by</span>
                        <div className="w-full flex flex-wrap">
                            {sortby.map((x, i) => (
                                <span className="m-1" key={i}>
                                    <motion.button
                                    whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            setSortByState(i);
                                            props.onSortSwitch(i);
                                        }}
                                        className={
                                            " rounded-full text-sm text-coolGray-900 text-center inline px-5 py-2 bg-white shadow border transition-all " +
                                            (i == sortByState ? "border-blue-700" : "border-gray-300")
                                        }
                                    >
                                        {x}
                                    </motion.button>
                                </span>
                            ))}
                        </div>
                        <span className="text-base font-medium text-coolGray-900">Category</span>
                        <div className="w-full flex flex-wrap">
                            {category.map((x, i) => (
                                <span className="m-1" key={i}>
                                    <motion.button
                                    whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            setCategoryState(i);
                                            props.onCategorySwitch(i);
                                        }}
                                        className={
                                            " rounded-full text-sm text-coolGray-900 text-center inline px-5 py-2 bg-white shadow border transition-all " +
                                            (i == categoryState ? "border-blue-700" : "border-gray-300")
                                        }
                                    >
                                        {x}
                                    </motion.button>
                                </span>
                            ))}
                        </div>
                        <button onClick={()=>{props.show();setFilterOn(false)}} className=" mt-3 flex self-stretch text-white font-medium justify-center px-6 py-2 text-base bg-blue-700 rounded">
                            Show
                        </button>
                    </div>

                </Block>
            </PageContent>
        </Sheet>
    )
}