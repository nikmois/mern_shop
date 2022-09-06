import React, {useEffect, useState} from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavbarCommon from "../components/NavbarCommon";
import Newsletter from "../components/Newsletter";
import Sidebar from "../components/Sidebar";
import MobileCart from "../components/MobileCart";
import { useLocation } from "react-router-dom";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {motion} from 'framer-motion/dist/framer-motion';
import { Alert } from "@material-ui/core";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Helmet } from "react-helmet";



const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90vw;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const Spinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20vh;
    width: 90vw;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const Wrapper = styled.div`
    padding: 7vh clamp(6px, 2vw, 50px) 10vh clamp(6px, 2vw, 50px);
    display: flex;
    width: 100%;
    @media screen and (max-width: 850px) {
        flex-direction: column;
        padding-top: 0;
    }
`;

const ImgContainer = styled.div`
flex: 1;
`;

const Image = styled.div`
    width: 100%;
`;

const InfoContainer = styled.div`
    padding: 0 clamp(6px, 2vw, 50px);
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
`;

const Title = styled.h1`
    font-weight: 400;
    font-size: clamp(25px, 5vw, 40px);
`;

const Desc = styled.p`
    margin: 0 0 20px 0;
    color: #6d6d6d;
    font-size: clamp(16px, 3vw, 18px);
`;

const StockText = styled.p`
    margin: 0 0 20px 0;
    color: #f30000;
    font-size: clamp(16px, 3vw, 18px);
`;

const LongDesc = styled.p`
    margin: 20px 0;
    color: #4e4e4e;
    font-size: clamp(15px, 3vw, 18px);
`;

const PriceContainer = styled.div`
    display: flex;
`;

const Price = styled.div`
    font-weight: 100;
    font-size: clamp(22px, 5vw, 30px);
    color: #c9660a;
    margin: 5vw 0 1vw 0;
`;

const NormalPrice = styled.div`
    font-weight: 100;
    font-size: clamp(22px, 5vw, 30px);
    color: #636363;
    margin: 5vw 1rem 1vw 0;
    position: relative;
    :before{
        border-bottom: 3px solid red;
        position: absolute;
        content: "";
        width: 100%;
        height: 50%;
        transform: rotate(12deg);
    }
`;

const FilterContainer = styled.div`
    margin: 20px 0 50px 0;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;
const FilterTitle = styled.span`
    font-weight: 600;
    font-size: 1rem;
    margin-right: 10px;
`;
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    cursor: pointer;
    margin: 7px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.959);
    transition: all 0.3s ease;
    &:hover{
        transform: scale(1.1);
    }
`;

const AddContainer = styled.div`
    display: flex;
    width: 100%;
    
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
    padding-right: 20px;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #2cb2e7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2.5px solid #2cb2e7;
    background-color: #2cb2e7;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;

    &:hover{
        background-color: #2486ad;
    }
`;

const RemoveBut = styled(Remove)`
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.2);
    }
`;

const AddBut = styled(Add)`
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.2);
    }
`;

const Product = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product,setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [loading, setLoading] = useState(false);
    const [dbColor, setDbColor] = useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [images, setImages] = useState(null);

    useEffect(() => {
      const controller = new AbortController();
      let fetchApi = true;
      const getProduct = async () => {
        if (fetchApi) {
            if(id){
          try {
              setLoading(true)
            const res = await axios.get(
              "https://baby-pingviin.herokuapp.com/api/products/find/" + id,
              {
                signal: controller.signal,
              }
            );
            setProduct(res.data);
            
            setLoading(false)
            
          } catch (err) {
            if (axios.isCancel(err)) {
              console.log("caught cancel");
            } else {
              throw err;
            }
          }
        }
        } else {
          return;
        }
      };
      getProduct();
      return () => {
        controller.abort();
        fetchApi = false;
      };
    }, [id]);
    

    useEffect(() => {
        if (product.color?.length === 1) {
            setColor(product?.color[0]);
          } else if (product.color?.length > 1) {
            setDbColor(product?.color);
          }
    }, [product.color])

    useEffect(() => {
    if(product){
        setImages([{
            original: product.img1,
            thumbnail: product.img1,
            loading: "lazy"
        }]);
        if(product.img2){
            setImages((images)=>[...images,{
                original: product.img2,
                thumbnail: product.img2,
                loading: "lazy"
            }])
        }
        if(product.img3){
            setImages((images)=>[...images,{
                original: product.img3,
                thumbnail: product.img3,
                loading: "lazy"
            }])
        }
        if(product.img4){
            setImages((images)=>[...images,{
                original: product.img4,
                thumbnail: product.img4,
                loading: "lazy"
            }])
        }
        if(product.img5){
            setImages((images)=>[...images,{
                original: product.img5,
                thumbnail: product.img5,
                loading: "lazy"
            }])
        }
        if(product.img6){
            setImages((images)=>[...images,{
                original: product.img6,
                thumbnail: product.img6,
                loading: "lazy"
            }])
        }
    }
    }, [product])
    



    const colorCheck = () => {
        if (typeof product.color !== 'undefined' && product.color.length > 0) {
            
            return(
                <Filter>
                <FilterTitle>Valige toode värv:</FilterTitle>
                { product.color?.map((c) => (
                <div key = {c} style={{border: color === c ? '2px solid blue' : 'none', borderRadius: '50%', margin: color === c && '-2px'}}>
                <FilterColor color = {c}  onClick={()=>setColor(c)}/>
                </div>
                ))}
                </Filter>
            )        
        } else {
            return
        }        
    };

    const priceCheck = () => {
        if (product.oldPrice) {
            return(
                <PriceContainer>
                    <NormalPrice>{`${product.oldPrice.toFixed(2)} €`}</NormalPrice>
                    <Price>{`${product.price.toFixed(2)} €`}</Price>
                </PriceContainer>
            )
        } else {
            return(
                <Price>{`${product.price?.toFixed(2)} €`}</Price>
            )
        }
    };

    const stockCheck = () => {
        if (product.inStock < 1) {
            return(
                <StockText>
                    Antud toode on otsas. Eeldatav tarneaeg on 10 päeva.
                </StockText>
            )
        }else{
            return
        }
    }
    
    const handleQuantity = (type) => {
        if(type === "dec"){
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }


    const handleClick = () =>{
        if (!color && dbColor?.length > 1){
            setOpen(true);
            return
        }
        dispatch(
            addProduct({ ...product, quantity, color, dbColor })
            );
            setOpen2(true)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

      const action2 = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose2}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    return (
        <>
        <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0, transition: {duration: 0.05}}}>
            <Helmet>
        <title>{product.title}</title>
        <meta name="description" content="BabyPingviin on 2021. aastal loodud pereettevõte, mis pakub kvaliteetseid lauanõusid nii beebidele kui ka väikelastele ning arendavaid mänguasju mitmes vanuses mudilastele. 
                Meie tooted sobivad ideaalselt teie lastele, sest need on valitud hoolivate ja armastavate vanemate poolt. Meie visiooniks on pakkuda taskukohase hinnaga laste- ja beebitooteid ning erinevaid tarbeid,
                mis aitaks säästa pere eelarvet jättes seeläbi ruumi tõeliselt suurte unistuste jaoks." /> 
        <meta name="keywords" content="lastepood e-pood mänguasjad lastenõud beebitooted babypingviin BabyPingviin kvaliteetsed tooted arendavad mänguasjad nõusid" />
    </Helmet>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <NavbarCommon toggle={toggle} scrolled={scrolled}/>
            <Announcement />
            {loading ? 
            <Spinner>
            <BeatLoader 
            color="#f4a216"
            margin={2}
            size={25}
            />
            </Spinner>
            :
            <ContentContainer>
            <Wrapper>
                <ImgContainer>
                <Image>
                {images && <ImageGallery items={images} showFullscreenButton={false} lazyLoad={true} showPlayButton={false} />}
                </Image>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc><i>{product.desc}</i></Desc>
                    {priceCheck()}
                    <LongDesc>{product.longDesc}</LongDesc>
                    <FilterContainer>
                    {colorCheck()}
                    </FilterContainer>
                    {stockCheck()}
                    <AddContainer>
                        <AmountContainer>
                            <RemoveBut style={{cursor: "pointer"}} onClick={()=>handleQuantity("dec")}/>
                            <Amount>{quantity}</Amount>
                            <AddBut style={{cursor: "pointer"}} onClick={()=>handleQuantity("inc")}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>LISA KORVI</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            </ContentContainer>
            }
            <Newsletter /> 
            <Footer />
            <MobileCart />
            <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            action={action}
            sx={{ bottom: { xs: 90, sm: 50 } }}
            >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Palun valige toode värv!
            </Alert>
            </Snackbar>
            <Snackbar
            open={open2}
            autoHideDuration={5000}
            onClose={handleClose2}
            action={action2}
            sx={{ bottom: { xs: 90, sm: 50 } }}
            >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Toode on edukalt lisatud korvi!
            </Alert>
            </Snackbar>
            </motion.div>
        </>
      
    )
}

export default Product
