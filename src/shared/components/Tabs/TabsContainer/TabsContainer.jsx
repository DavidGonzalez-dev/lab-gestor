import { useState, Children } from 'react';
import { Tab } from '../Tab/Tab';
import { TabContent } from '../TabContent/TabContent';
import styles from './TabsContainer.module.css';

import { ProductCard } from '@features/productos/components/ProductCard/ProductCard';
import { EntryDetailsCard } from '@features/productos/components/EntryDetailsCard/EntryDetailsCard';
import { AnalisisOutlet } from '@features/productos/components/AnalisisOutlet/AnalisisOutlet';

export const TabsContainer = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    return (
        <nav>
            <Tab isActive={activeTab === 0} onClick={() => handleTabClick(0)}>InfoProducto</Tab>
            <Tab isActive={activeTab === 1} onClick={() => handleTabClick(1)}>Analisis Producto</Tab>
            <Tab isActive={activeTab === 2} onClick={() => handleTabClick(2)}>Controles Negativos Producto</Tab>

            <TabContent isActive={activeTab === 0}>
                <section id="productInfo">
                    <div className="row">
                        <div className="col-lg-6">
                            {data && (
                                <ProductCard producto={data.producto} />
                            )}
                        </div>
                        <div className="col-lg-6">
                            {data && <EntryDetailsCard data={data} />}
                        </div>
                    </div>
                </section>
            </TabContent>

            <TabContent isActive={activeTab === 1}>
                <section className="analisisSection">
                    <h2>Analisis Registrados</h2>
                    {data && (
                        <AnalisisOutlet
                            numeroRegistroProducto={data.numeroRegistroProducto}
                        />
                    )}
                </section>
            </TabContent>

            <TabContent isActive={activeTab === 2}>
                {/* Content for Controles Negativos Producto */}
            </TabContent>
        </nav>
    );

}   