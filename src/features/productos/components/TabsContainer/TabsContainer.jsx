import { useState } from 'react';
import { Tab } from '../../../../shared/components/Tabs/Tab/Tab';
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
        <div className={styles.tabsContainer}>
            <nav className={styles.tabNav}>
                <Tab isActive={activeTab === 0} onClick={() => handleTabClick(0)}>InfoProducto</Tab>
                <Tab isActive={activeTab === 1} onClick={() => handleTabClick(1)}>Analisis Producto</Tab>
                <Tab isActive={activeTab === 2} onClick={() => handleTabClick(2)}>Controles Negativos Producto</Tab>
            </nav>

            <div className={styles.tabContent}>

                {/* Info Producto */}
                {activeTab === 0 && (
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
                    </section>)
                }

                {/* Analisis del Producto */}
                {activeTab === 1 &&
                    (<section className="analisisSection">
                        <h2>Analisis Registrados</h2>
                        {data && (
                            <AnalisisOutlet
                                numeroRegistroProducto={data.numeroRegistroProducto}
                            />
                        )}
                    </section>)
                }
            </div>
        </div>
    );

}   