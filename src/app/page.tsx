import Container from "@/UI/container/components/Container";
import HomeBanner from "@/UI/navBar/components/HomeBanner";
import ProductsContainer from "@/UI/container/components/ProductsContainer";


export default function Home () {
    return (
        <div className = { "p-8" }>
            <Container>
                <div>
                    <HomeBanner/>
                </div>
                <div>
                    <ProductsContainer/>
                </div>
            </Container>
        </div>
    );
}
