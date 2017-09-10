/**
 * Imports
 */
import React from 'react';

// Required components
import Heading from '../../common/typography/Heading';

/**
 * Component
 */
class InfoPage extends React.Component {

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        return {
            title: 'Información'
        }
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./InfoPage.scss');
    }

    //*** Template ***//

    render() {
        return (
            <div className="info-page">
                <div className="info-page__title">
                    <Heading size="large">
                        Información
                    </Heading>
                </div>
                <div className="info-page__content">
                    <div className="info-page__block">
                        <Heading size="medium">
                            Asistencia al cliente
                        </Heading>
                        <div className="info-page__support">
                            <p>
                                Para cualquier problema relacionado con la tienda online, póngase en contacto a través de <a href="mailto:vendas@tienda765.com"> ventas@tienda765.com </a> <br />
                                Gracias
                            </p>
                        </div>
                    </div>
                    <div className="info-page__block">
                        <Heading size="medium">
                          Costos de Envío
                        </Heading>
                        <div className="info-page__shipping">
                            <p>
                              Costos de Envío
                            </p>
                            <p>
                                Válido para Resistencia Chaco
                                <ul>
                                    <li>Gratis para encomiendas con valor superior a $150 en Zona 1 y 2 solamente</li>
                                    <li>Gratis para envíos en la Zona 1</li>
                                    <li>Gratis para envíos en la Zona 2</li>
                                    <li>$40 Para envíos en la Zona 3</li>
                                </ul>
                            </p>
                            <p>
                                Todos los precios incluyen IVA.
                            </p>
                        </div>
                    </div>
                    <div className="info-page__block">
                        <Heading size="medium">
                            Términos y Condiciones
                        </Heading>
                        <div className="info-page__terms-and-conditions">
                            <p>
                            Términos y Condiciones Generales de Venta<br />
                                 Estimado (a) Cliente,
                            </p>
                            <p>
                            ¡Bienvenido a la tienda Tienda765 Store!
                                 Los Términos y Condiciones Generales de Venta que siguen regulan la oferta y la venta de productos en nuestro sitio web ("tienda765.com").
                                 Los productos adquiridos en los sitios web Tienda765 son vendidos directamente por Tienda 765 Resistencia Chaco, Representaciones S.A. (de ahora en adelante denominado Tienda765 ).
                                 Recordamos también que los usuarios tienen el derecho de solicitar y recibir apoyo de la Tienda765 sobre pedidos y entregas o cómo hacer compras en línea en el plazo de 72 horas laborables a partir del momento en que se recibe la solicitud (salvo motivos de fuerza mayor).
                            </p>
                            <p>
                              Todas las solicitudes se deben realizar a través de la página web destinada a este efecto, siendo posible en caso de duda contactar al centro de atención al cliente a través de correo electrónico a la dirección creada a tal efecto, ya sea a través del número de apoyo existente. Cuanto más información nos proporcione mejor y más rápidamente podremos darle apoyo y más eficiente será nuestro servicio. Para obtener más información sobre los pedidos y el estado de la entrega, se pondrá a disposición del usuario una vez que haya algún cambio en el estado del pedido. Todas las comunicaciones se enviarán a su dirección electrónica (e-mail) registrada en el momento del pedido. La información legal relativa a las compras en línea y las entregas está disponible en la sección de "Términos y Condiciones Generales de Venta" y "Política de Privacidad" en nuestra página web.
                            </p>
                            <p>
                            <strong> 1. Nuestra política comercial </ strong> <br />
                                1.1 Los productos Tienda765 presentes en nuestro catálogo en línea y los servicios comerciales previstos están disponibles exclusivamente para sus usuarios finales, es decir los "Consumidores". Nuestros productos y sus respectivos precios son válidos si siempre que estén disponibles en nuestros almacenes.
                                1.2 "Consumidor" significa, de conformidad con el artículo 18 del Código del Consumo, cualquier persona física que actúe con fines fuera de su actividad económica, comercial o profesional. Si no es un consumidor, le pedimos que no compre ningún producto en nuestra tienda online.
                                1.3 La Tienda765 se reserva el derecho de no procesar pedidos recibidos de usuarios que no sean "Consumidores" y cualquier otro pedido que no cumpla la política comercial de la Tienda765 Argentina.
                                Los presentes Términos y Condiciones Generales de Venta regulan exclusivamente la oferta, transmisión y aceptación de pedidos de compra relativos a productos existentes en la tienda online de la Tienda765 entre los usuarios de la Tienda765 y la empresa Tienda765.
                                1.5 Los Términos y Condiciones Generales de Venta no regulan la prestación de servicios o la venta de productos por parte de terceros que estén en Tienda765 Argentina a través de enlaces, banners u otras conexiones de hipertexto. Antes de enviar pedidos y adquirir productos y servicios a estos terceros, recomendamos a nuestros usuarios que cumplan los términos y condiciones de éstos, ya que la Tienda765 Argentina no puede, en ninguna circunstancia,                ser responsabilizada por la prestación de servicios prestados por terceros o por la ejecución De transacciones de comercio electrónico entre usuarios de Tienda765 Argentina y terceros.
                            </p>
                            <p>

                            <strong> 2. Cómo celebrar un contrato con Tienda765  </ strong> <br />
                                2.1 Para solicitar un pedido relativo a la adquisición de uno o varios productos en Tienda765 , deberá elegir los mismos en la tienda online y rellenar el formulario de pedido que se envía electrónicamente a la plataforma alquilada a tal efecto, siguiendo las instrucciones pertinentes al añadir un producto A la cesta, quedando su compra registrada.<br />
                                2.2 El formulario del pedido contiene una sección con estos Términos y Condiciones Generales de Venta, y contiene también información sobre las principales características de cada producto pedido y su precio unitario (incluyendo todas las tasas y derechos aplicables), el tipo de pago que puede Para la compra, los términos de envío a los productos adquiridos, los gastos de envío y entrega, y las referencias a los términos y condiciones para la devolución de artículos adquiridos en línea.<br />
                                2.3 Se considera que un pedido se ha efectuado cuando la Tienda765  ha recibido su formulario de pedido por vía electrónica y la información ha sido verificada y dada como correcta.<br />
                                2.4 Antes de enviar su formulario de pedido para la compra de productos, se le pide que lea atentamente los Términos y Condiciones Generales de Venta, guarde o solicite una copia del mismo para su uso personal.<br />
                                2.5 El formulario de pedido se archiva en nuestra base de datos por el tiempo necesario para procesar su pedido de conformidad con la ley. Puede acceder a su formulario de pedido en su email, el cual se envía inmediatamente después del pago a través de Paypal o después de finalizar el pedido cuando se selecciona el modo de pago Transferencia Bancaria o Contra-Reembolso. Además, la copia de las pruebas informáticas relativas a la celebración del contrato se conservará por el tiempo previsto por las normas de derecho civil y fiscal aplicables.<br />
                                2.6 Los pedidos enviados a la Tienda765  deben cumplimentarse en Español, Inglés o Español, de acuerdo con el país al que se enviará el pedido.<br />
                                2.7 Después de que su formulario de pedido haya sido registrado, Tienda765  procesará su pedido tan pronto como sea posible.<br />
                                2.9 Tienda765  puede no procesar pedidos de compra si no hay garantías suficientes de solvencia, si los pedidos son incompletos o incorrectos, o si los productos ya no están disponibles. En las situaciones antes mencionadas, le informaremos por correo electrónico de que el contrato no se ha ejecutado y que la Tienda765  no ha efectuado su pedido especificando los motivos. Además de la información suministrada, Tienda765  no está en condiciones de dar indicaciones más detalladas en relación con la disponibilidad del producto (s); Por lo que una vez examinada su pedido, Tienda765  le informará por correo electrónico o por teléfono si algunos de los productos pedidos por usted no están disponibles. Sin perjuicio de las disposiciones de las Condiciones Generales de Venta, se considera que el pedido en cuestión tiene por objeto prestaciones de venta divisibles, autónomas y relativas a más de una unidad económica, cuantos son los productos pedidos, tal como se ha expresado expresamente Cliente y Tienda765  con el envío del pedido y la aceptación de la misma. Por consiguiente, en el caso en que la ejecución del pedido por parte de Tienda765  se limite a algunos de los productos pedidos debido a la indisponibilidad de algunos de ellos o por otras razones legítimas, independientes de la voluntad de Tienda765 , con el envío del pedido en cuestión, El Comprador declara su interés y presta su consentimiento a la ejecución parcial de la compra, limitada a los productos restantes, que por lo tanto no podrá ser rechazada por el Comprador, ni podrá consentir al Comprador la terminación de dicho pedido. En el caso Tienda765  no se encuentra en las condiciones de aceptar íntegramente el pedido efectuado por el Cliente, dando lugar a la aceptación parcial de la misma con respecto a los productos disponibles, el eventual ejercicio del derecho de arrepentimiento previsto por el art. N ° 8 de las Condiciones Generales de Venta no dará lugar a ningún gasto de transporte a cargo del propio cliente.<br />
                                2.10 La presentación de un formulario de pedido a la Tienda765  significa la aceptación incondicional y el compromiso de observar las disposiciones de los presentes Términos y Condiciones Generales de Venta en el contrato que celebra con Tienda765 . Si no está de acuerdo con algunas de las disposiciones de los presentes Términos y Condiciones Generales de Venta, no someta su formulario de pedido para la compra de productos en la Tienda765  y contacte con nosotros.<br />
2.11 Al someter un formulario de pedido, acepta y acepta las presentes Condiciones Generales de Venta, así como con otras condiciones igualmente contenidas en la Tienda765  a través de enlaces, incluyendo los Términos y Condiciones Generales de Venta y Política de Privacidad. />
                                2.12 Una vez enviado un formulario de pedido, Tienda765  le enviará por correo electrónico copia del recibo electrónico de la orden de compra, que contiene un resumen de la información relacionada con el formulario de pedido (Principales características de los productos, información detallada sobre el precio , Condiciones de pago y el costo de la solicitud de envío al cliente, dirección donde presentar eventuales reclamaciones y servicios de asistencia posventa).
                                2.13 Al someter un formulario de pedido a la Tienda765 , está aceptando recibir la factura / talón emitidos a efectos fiscales en formato Físico junto con el pedido efectuado.
                            </ p>
                            <p>
                                <strong> 3. Garantías e indicación del precio del producto </ strong> <br />
                                Los productos para la venta en Tienda765  son de calidad superior, de acuerdo con los estándares europeos, después de pasar por las pruebas de calidad. Estas pruebas son supervisadas por la Tienda765.<br />
                                3.2 Las principales características de los productos se presentan en la Tienda765  en la página web de cada producto. Los productos ofrecidos para la venta en la Tienda765  pueden no corresponder exactamente a lo real en términos de imagen y colores debido al navegador de Internet o al monitor utilizados. Las imágenes presentadas tienen un efecto meramente indicativo. Las características técnicas de un producto, las homologaciones y declaraciones de seguridad de un producto de marca Tienda765  y de cualquier otro producto vendido a través del sitio se indican en la etiqueta o en el embalaje o en las instrucciones de uso del producto y pueden estar mencionadas en la totalidad o En parte en el propio sitio junto a la ilustración del producto. Todos los productos de marca Tienda765  cumplen los estándares y están homologados según lo previsto por las normas de la Comunidad Argentina de Ventas online.<br />
                                3.3 El precio de los productos se expresa en euros, incluido el IVA, así como todos los impuestos e impuestos aplicables aplicándose los gastos de transporte cuando el pedido efectuado no esté exenta de las mismas. Los precios están sujetos a cambios. Compruebe el precio final de venta y los gastos de transporte antes de enviar el formulario de pedido.<br />
                                3.4 Los pedidos efectuados desde el sitio de un país distinto del que desea enviar el producto, o para direcciones para las cuales la Tienda765  no permite expedir, son automáticamente canceladas.<br />
                                3.5 Todos los productos se entregan con una etiqueta de identificación. No retire la etiqueta o el sello de los artículos adquiridos si desea devolverlos. No somos en modo alguno responsables de información o datos erróneos ni por eventuales inexactitudes técnicas o de cualquier otra naturaleza proporcionadas por terceros a la Tienda765 .<br />
                                3.6 En caso de que decida ejercer su derecho de devolución de los productos adquiridos, Tienda765  tiene el derecho de no aceptar productos que se devuelven sin la correspondiente etiqueta o si éstos han sufrido cambios en el estado original o si se presentan dañados (p. O estropeados).<br />
                                3.8 La garantía, suministrada en el período de duración asociado, se aplicará al producto que presente un defecto de conformidad, siempre que el producto se haya utilizado correctamente, respetando el uso a que se destina y de lo previsto en la documentación técnica o las instrucciones de uso Uso adjunto. La garantía se presta únicamente al cliente que sea el consumidor. En caso de defectos de conformidad, con los gastos a nuestro cargo, se procederá al restablecimiento de la conformidad del producto mediante la reparación o sustitución o la reducción del precio, a menos que se resuelva el contrato, si procede. La asistencia durante el período de garantía se realiza mediante la exhibición del Factura de Compra. Nos reservamos la posibilidad de sustituir el producto (a nuestra discreción incluso por un producto de características equivalentes) o rescindir el contrato de venta con la devolución del valor total pagado y de eventuales gastos posteriores, en el caso de que, por cualquier motivo, no Es posible restablecer o sustituir un producto en el período de garantía. No nos responsabilizamos por eventuales retrasos en la sustitución. En los casos en que esté prevista la devolución del producto para poder disfrutar de la garantía, el producto deberá ser restituido en el embalaje original, con todas las partes que lo componen (incluyendo el embalaje y eventual documentación y accesorios suministrados: manuales, envoltorios, etc.) . Garantizamos el cumplimiento de las normas de calidad relativas a nuestros productos exclusivamente hasta el momento de la entrega. Se excluye cualquier responsabilidad de nuestra parte derivada del uso inapropiado de los productos después de la entrega.
                            </p>
                            <p>
                                <strong>4. Págos</strong><br />
                                4.1 El pago del precio de los productos y sus costes de envío deben realizarse utilizando uno de los procedimientos indicados en el formulario de pedido en línea.<br />
                                4.2 En el caso de pago por Transferencia bancaria, el cliente final deberá efectuar la misma para la cuenta designada en el proceso de pedido en el plazo de 24 horas después de la finalización de la misma, enviando el comprobante a la dirección <a href = "mailto: ventas @ Tienda765.com "> ventas@tienda765.com </a>, indicando el número de pedido correspondiente. En el caso de pago por contra reembolso el cliente final deberá indicar el máximo de datos esenciales para la entrega del pedido y su cobro, así como el número de identificación fiscal (NIF) y un contacto telefónico para confirmación de entrega o proporcionarlo al transportista , Siendo que en este caso el cliente final acuerda aceptar estos términos, en que su contacto pueda ser cedido sólo con la finalidad de entrega de la misma. En el caso de pago por Paypal, todos los datos (por ejemplo, número de tarjeta y fecha de caducidad) se gestionan directamente en el sitio de pagos en línea de PayPal (Europe) S.à r.l. Y Cie, S.C.A. Que presta los servicios remotos de pago electrónico, sin que terceros tengan ningún tipo de acceso a los mismos. Tales datos no serán utilizados directamente por Tienda765 . El producto consistirá en el proceso de gestión de los pagos siempre a través del mismo gestor de pagos: sea relativo a compras o la emisión de reembolsos en caso de devoluciones, en el cumplimiento del ejercicio de su derecho de devolución o en los casos señalados como posibles fraudes por la autoridad De seguridad pública. El precio relativo a los productos adquiridos y sus costes de envío, como se indica en el formulario de pedido, se cargarán en su tarjeta de débito / crédito después de haber efectuado el pago de los mismos en el sitio del proveedor. Todos los datos sobre los términos de uso de Paypal se pueden encontrar <a href = "https://cms.paypal.com/ie/cgi-bin/?cmd=_render-content&content_ID=ua/UserAgreement_full&locale.x=en_US "Target =" _ blank "> en este enlace </a>, siendo la Tienda765  ajena a cualquier problema con pagos o utilización de este medio.
                                4.4 Si, por cualquier razón, existe algún problema en el pago del pedido o la ausencia de la efectividad del mismo, la Tienda765  se reserva el derecho de cancelar la misma, siendo esta información enviada posteriormente por e-mail.
                            </p>
                            <p>
                                <strong>5. Vouchers Electrónicos de Descuentos en la tienda online de la Tienda765 </strong><br />
                                5.1 Los Vouchers suministrados por la tienda online de la Tienda765 , son códigos electrónicos, también denominados códigos de descuento Tienda765 , que le permiten aprovechar un descuento en la compra de artículos o categorías específicas en la tienda online de la Tienda765 .<br />
                                5.2 El cuadro de inserción del indicador de descuento Tienda765  se visualiza en la esquina inferior izquierda de la pantalla de resumen de la cesta de la compra y el consumidor que envía el mismo a través del botón enviar. El descuento se calculará automáticamente, siendo responsabilidad del consumidor comprobar si este descuento se refleja en el precio final del pedido.<br />
                            </p>
                            <p>
                                <strong>[Resolución alternativa de conflictos]</strong>
                            </p>
                            <p>
                                En caso de litigio de consumo en línea, el consumidor puede recurrir a un sistema de resolución de litigios en línea (RLL), la Plataforma ODR (en línea controvertida), con competencia para resolver los litigios relativos a las obligaciones contractuales resultantes De contratos de venta o de servicios en línea.
                            </p>
                            <p>
                                El consumidor pasa así a tener un portal único donde puede registrar sus reclamaciones y acompañar su evolución. "La plataforma garantiza todos los pasos para resolver los litigios, desde la introducción por el consumidor, pasando por la interconexión con las entidades de RAL, y terminando en la información a las partes involucradas"
                            </p>
                            <p>
                                Acceda aquí a la Plataforma Electrónica de Resolución Alternativa de Litigios en los contratos de venta o de servicios online.
                            </p>
                            <p>
                            Para Quejas y Reclamaciones - <a href="mailto:vendas@tienda765.com"> ventas@tienda765.com </a> <br />
                                 Más información en Portal del Consumidor - <a href="http://www.consumidor.ar" target="_blank">http://www.consumidor.ar </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default InfoPage;
