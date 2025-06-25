import { Tab } from '../../../../shared/components/Tabs/Tab/Tab';
import styles from './TabsContainer.module.css';

import { ProductCard } from '@features/productos/components/ProductCard/ProductCard';
import { EntryDetailsCard } from '@features/productos/components/EntryDetailsCard/EntryDetailsCard';
import { AnalisisOutlet } from '@features/productos/components/AnalisisOutlet/AnalisisOutlet';
import { TablaControlesNegativos } from '@features/controlesNegativos/components/TablaControlesNegativos/TablaControlesNegativos';

import useTabs from '@shared/stores/useTabsContainerStore';

export const TabsContainer = ({ data }) => {
    const { activeTab, setActiveTab } = useTabs();

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
                    <section className={styles.productInfo}>
                        <div className="header">
                            <h2>Detalles del Producto</h2>
                            <p>Aqui puedes ver los detalles del producto asi como editar su informacion</p>
                        </div>
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
                    (<section className={styles.analisisSection}>
                        <div className="header">
                            <h2>Analisis Registrados</h2>
                            <p>Aqui puedes ver los análisis registrados para este producto. Si quieres modificar o ver el detalle de cada analisis puedes darle al boton de ver más</p>
                        </div>
                        {data && (
                            <AnalisisOutlet
                                numeroRegistroProducto={data.numeroRegistroProducto}
                            />
                        )}
                    </section>)
                }

                {activeTab === 2 &&
                    (<section className={styles.controlesNegativosSection}>
                        <div className="header">
                            <h2>Controles Negativos Registrados</h2>
                            <p>Aqui puedes ver los controles negativos registrados para este producto. Si quieres modificar o ver el detalle de cada control negativo puedes darle al boton de ver más</p>
                        </div>
                        {data && (
                            <TablaControlesNegativos
                                numeroRegistroProducto={data.numeroRegistroProducto}
                            />
                        )}
                    </section>)
                }
            </div>
        </div>
    );

}   