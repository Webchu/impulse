; (function () {
    /**
     * @todo
     * 1. aceitar quantidade de produtos por vitrine (slidesToShow)
     * 2. aceitar informar o template alternativo para o product.line (AlternativeTemplate - product_list_by_id)
     * 3. aceitar informar se é dummy/homolog
     */
    const _HOMOLOGATION = true,
        _DUMMY = true,
        _SLIDES_VERTICAL_DESKTOP = 1,
        _SLIDES_SHOW_MOBILE = 2,
        _SLIDES_SCROLL_MOBILE = 2,
        _SLIDES_SHOW_DESKTOP = 5,
        _SLIDES_SCROLL_DESKTOP = 5,
        _ARROWS_MOBILE = false,
        _ARROWS_DESKTOP = false,
        _DOTS_MOBILE = true,
        _DOTS_DESKTOP = true,
        _WIDGETBOX = false;

    try {
        //app.require(['https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js'], () => {

            const getPageType = () => {
                const _class = $('body').attr('class');
                let type = 'other';
                if (!!~_class.indexOf('HomeRoute')) {
                    type = 'home';
                } else if (!!~_class.indexOf('context-product')) {
                    type = 'product';
                } else if (!!~_class.indexOf('EasyCheckoutStep')) {
                    type = 'checkout';
                } else if (!!~_class.indexOf('EasyCheckoutReceiptStep')) {
                    type = 'transaction';
                } else if (!!~_class.indexOf('context-category')) {
                    type = 'category';
                } else if (!!~_class.indexOf('context-search')) {
                    type = 'search';
                } else if (!!~_class.indexOf('BasketIndexRoute ')) {
                    type = 'cart';
                } else if (!!~_class.indexOf('area-profile')) {
                    type = 'userprofile';
                } else if (!!~_class.indexOf('ErrorRoute')) {
                    type = 'not_found';
                }
                return type;
            };
            
            const _pageType = getPageType()

            Handlebars.registerHelper('checklength', function (v1, v2, options) {
                'use strict';
                if (v1.length > v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            });

            if (typeof (detectmob) == 'undefined') {
                function detectmob() {
                    if (navigator.userAgent.match(/Android/i)
                        || navigator.userAgent.match(/webOS/i)
                        || navigator.userAgent.match(/iPhone/i)
                        || navigator.userAgent.match(/iPad/i)
                        || navigator.userAgent.match(/iPod/i)
                        || navigator.userAgent.match(/BlackBerry/i)
                        || navigator.userAgent.match(/Windows Phone/i)
                    ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }

            const createPlaceholders = total => {
                const placeholders = [];
                for (let i = 0; i < total; i++) {
                    placeholders.push(i);
                }
                return placeholders;
            }

            /**
             * @todo
             * colocar direto no template do widget
             */
            $('body').append(`
                <template id="template-vitrine-impulse-category">
                    <div class="wd-product-list wd-product-list-impulse wd-widget lazy {{ feature }}" data-showcase-id="{{ id }}">
                        <!--
                        <div class="wd-header">
                            <div class="wd-title">{{ title }}</div>
                        </div>
                        -->
                        <div class="wd-content">
                            <div class="title">
                                <span>Produtos em destaque</span>
                            </div>                            
                            <div class="content">
                                <ul class="list row">
                                    {{#each placeholders }}
                                    <li class="product-x col col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div class="wd-product-line placeholder">
                                            <div class="stroke animate photo"></div>
                                            <div class="stroke animate name"></div>
                                            <div class="stroke animate code"></div>
                                            <div class="stroke animate rating"></div>
                                            <div class="stroke animate description"></div>
                                            <!--<!--<div class="stroke animate price"></div>-->-->
                                            <div class="stroke animate button"></div>
                                            <div class="stroke animate category"></div>
                                        </div>
                                    </li>
                                    {{/each}}
                                </ul>
                            </div>
                        </div>
                        <div class="wd-footer"></div>
                    </div>
                </template>
                <template id="template-vitrine-impulse">
                    <div class="wd-product-list wd-product-list-impulse wd-widget lazy {{ feature }}" data-showcase-id="{{ id }}">
                        <div class="wd-header">
                            <div class="title">
                                <h2 class="supreme_title">
                                    {{ title }}
                                </h2>
                            </div>
                            <!--
                            <div class="wd-title">
                                <h2>{{ title }}</h2>
                            </div>
                            -->
                        </div>
                        <div class="wd-content">
                            {{#checklength menu 0}}
                            <ul class="menu" data-widget-id="{{ id }}">
                            {{#each menu}}
                            <li class="{{#if @first}}selected{{/if}}">
                                <a href="javascript:void(0)" data-campaign-id="{{ campaignId }}" data-widget="{{ url }}">{{ label }}</a>
                            </li>
                            {{/each}}
                            </ul>
                            {{/checklength}}
                            <div class="content">
                                <ul class="list row">
                                    {{#each placeholders }}
                                    <li class="product-x col col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div class="wd-product-line placeholder">
                                            <div class="stroke animate photo"></div>
                                            <div class="stroke animate name"></div>
                                            <div class="stroke animate code"></div>
                                            <div class="stroke animate rating"></div>
                                            <div class="stroke animate description"></div>
                                            <!--<div class="stroke animate price"></div>-->
                                            <div class="stroke animate button"></div>
                                            <div class="stroke animate category"></div>
                                        </div>
                                    </li>
                                    {{/each}}
                                </ul>
                            </div>
                        </div>
                        <div class="wd-footer"></div>
                    </div>
                </template>

                <template id="template-vitrine-impulse-single">
                    <div class="wd-product-list wd-product-list-impulse wd-widget lazy" data-showcase-id="{{ id }}">
                        <div class="wd-content">
                            <div class="content">
                                <ul class="list row">
                                    {{#each placeholders }}
                                    <li class="product-x col col-lg-3 col-md-4 col-sm-6 col-12">
                                        <div class="wd-product-line placeholder">
                                            <div class="stroke animate photo"></div>
                                            <div class="stroke animate name"></div>
                                            <div class="stroke animate code"></div>
                                            <div class="stroke animate rating"></div>
                                            <div class="stroke animate description"></div>
                                            <!--<div class="stroke animate price"></div>-->
                                            <div class="stroke animate button"></div>
                                            <div class="stroke animate category"></div>
                                        </div>
                                    </li>
                                    {{/each}}
                                </ul>
                            </div>
                        </div>
                    </div>
                </template>

                <template id="template-vitrine-impulse-referencia">
                    {{#unless showWrapper}}
                    <div class="wd-product-list wd-product-list-impulse list-referer wd-widget lazy {{ feature }}" data-showcase-id="{{ id }}">
                    {{/unless}}
                        <div class="parts">
                            <div class="referer">
                                <div class="wd-header">
                                    <div class="title">
                                        <h2 class="supreme_title">
                                            {{ title }}
                                        </h2>
                                    </div>
                                    <!--
                                    <div class="wd-title">
                                        <h2>{{ title }}</h2>
                                    </div>
                                    -->
                                </div>
                                <div class="wd-content">
                                    <a href="javascript:void(0)" data-refresh="{{ refreshReferenceUrl }}">Trocar</a>
                                    <div class="content">
                                        <ul class="list row">
                                            {{#each placeholderRef }}
                                            <li class="product-x col col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="wd-product-line placeholder">
                                                    <div class="stroke animate photo"></div>
                                                    <div class="stroke animate name"></div>
                                                    <div class="stroke animate code"></div>
                                                    <div class="stroke animate rating"></div>
                                                    <div class="stroke animate description"></div>
                                                    <!--<div class="stroke animate price"></div>-->
                                                    <div class="stroke animate button"></div>
                                                    <div class="stroke animate category"></div>
                                                </div>
                                            </li>
                                            {{/each}}
                                        </ul>
                                    </div>
                                </div>
                                <div class="wd-footer"></div>
                            </div>
                            <div class="others">
                                <div class="wd-header">
                                    <div class="title">
                                        <h2 class="supreme_title">
                                            {{ subtitle }}
                                        </h2>
                                    </div>
                                    <!--
                                    <div class="wd-title">
                                        <h2>{{ subtitle }}</h2>
                                    </div>
                                    -->
                                </div>
                                <div class="wd-content">                                
                                    <div class="content">
                                        <ul class="list row">
                                            {{#each placeholders }}
                                            <li class="product-x col col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="wd-product-line placeholder">
                                                    <div class="stroke animate photo"></div>
                                                    <div class="stroke animate name"></div>
                                                    <div class="stroke animate code"></div>
                                                    <div class="stroke animate rating"></div>
                                                    <div class="stroke animate description"></div>
                                                    <!--<div class="stroke animate price"></div>-->
                                                    <div class="stroke animate button"></div>
                                                    <div class="stroke animate category"></div>
                                                </div>
                                            </li>
                                            {{/each}}
                                        </ul>
                                    </div>
                                </div>
                                <div class="wd-footer"></div>
                            </div>
                        </div>
                    {{#unless showWrapper}}
                    </div>
                    {{/unless}}
                </template>

                <template id="template-vitrine-impulse-historico">
                    <div class="wd-product-list wd-product-list-impulse list-historic wd-widget lazy {{ feature }}" data-showcase-id="{{ id }}">
                        <div class="parts">
                            <div class="referer">
                                <div class="wd-header">
                                    <div class="title">
                                        <h2 class="supreme_title">
                                            {{ title }}
                                        </h2>
                                    </div>
                                    <!--
                                    <div class="wd-title">
                                        <h2>{{ title }}</h2>
                                    </div>
                                    -->
                                </div>
                                <div class="wd-content">
                                    <div class="content">
                                        <ul class="list row">
                                            {{#each placeholderRef }}
                                            <li class="product-x col col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="wd-product-line placeholder">
                                                    <div class="stroke animate photo"></div>
                                                    <div class="stroke animate name"></div>
                                                    <div class="stroke animate code"></div>
                                                    <div class="stroke animate rating"></div>
                                                    <div class="stroke animate description"></div>
                                                    <!--<div class="stroke animate price"></div>-->
                                                    <div class="stroke animate button"></div>
                                                    <div class="stroke animate category"></div>
                                                </div>
                                            </li>
                                            {{/each}}
                                        </ul>
                                    </div>
                                </div>
                                <div class="wd-footer"></div>
                            </div>
                            <div class="others">
                                <div class="wd-header">
                                    <div class="title">
                                        <h2 class="supreme_title">
                                            {{ subtitle }}
                                        </h2>
                                    </div>
                                    <!--
                                    <div class="wd-title">
                                        <h2>{{ subtitle }}</h2>
                                    </div>
                                    -->
                                </div>
                                <div class="wd-content">                                
                                    <div class="content">
                                        <ul class="list row">
                                            {{#each placeholders }}
                                            <li class="product-x col col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="wd-product-line placeholder">
                                                    <div class="stroke animate photo"></div>
                                                    <div class="stroke animate name"></div>
                                                    <div class="stroke animate code"></div>
                                                    <div class="stroke animate rating"></div>
                                                    <div class="stroke animate description"></div>
                                                    <!--<div class="stroke animate price"></div>-->
                                                    <div class="stroke animate button"></div>
                                                    <div class="stroke animate category"></div>
                                                </div>
                                            </li>
                                            {{/each}}
                                        </ul>
                                    </div>
                                </div>
                                <div class="wd-footer"></div>
                            </div>
                        </div>
                        
                    </div>
                </template>

                <template id="template-vitrine-impulse-base">
                    <ul class="list row">
                        {{#each placeholders }}
                        <li class="product-x col col-lg-4 col-md-4 col-sm-12 col-12">
                            <div class="wd-product-line placeholder">
                                <div class="stroke animate photo"></div>
                                <div class="stroke animate name"></div>
                                <div class="stroke animate code"></div>
                                <div class="stroke animate rating"></div>
                                <div class="stroke animate description"></div>
                                <!--<div class="stroke animate price"></div>-->
                                <div class="stroke animate button"></div>
                                <div class="stroke animate category"></div>
                            </div>
                        </li>
                        {{/each}}
                    </ul>
                </template>
            `);

            /**
             * @todo pode ser removido após publicação
             * usado somente para zerar as vitrines atuais
             */
            /*
            $('div[chaordic]').remove()

            if ($('div[data-impulse]').length == 0) {
                //$('<div data-impulse="top" /><div data-impulse="middle" /><div data-impulse="bottom" />').insertAfter($('section:first .product-detail .associations'))
                //$('<div data-impulse="top" /><div data-impulse="middle" /><div data-impulse="bottom" />').insertAfter($('.conteudo-home-2'));
                $('#lado-direito').prepend('<div data-impulse="top" class="vitrine" />');
                $('#content-wrapper').append('<div data-impulse="bottom" class="vitrine" />');
            }
            */

            const getShowCase = id => {
                return window.showcases.filter(item => {
                    return item.id == id;
                })[0];
            };

            const placeholderImpulse = (div, response) => {
                try {
                    if (response[div]?.length) {
                        response[div].forEach(item => {
                            const { id, feature, title, subtitle, impressionUrl } = item;
                            let menu = item.displays[0]?.menu || [];
                            let references = [];
                            let recommendations = [];
                            if (item.displays[0].references.length) {
                                references = item.displays[0].references;
                            }
                            recommendations = item.displays[0].recommendations;

                            let placeholderRef,
                                placeholders,
                                source,
                                refreshReferenceUrl;

                            window.showcases = window.showcases || [];
                            window.showcases.push({
                                id,
                                feature,
                                title,
                                recommendations,
                                references,
                                impressionUrl
                            });

                            if (['PurchasePersonalized', 'ViewPersonalized', 'UltimateBuy', 'CartPersonalized'].includes(feature)) {
                                placeholderRef = [1];
                                placeholders = detectmob() ? createPlaceholders(_SLIDES_SHOW_MOBILE) : [1, 2, 3, 4];
                                source = $("#template-vitrine-impulse-referencia").html();
                                refreshReferenceUrl = item.displays[0].refreshReferenceUrl;
                            } else if (feature == 'HistoryPersonalized') {
                                placeholderRef = detectmob() ? createPlaceholders(_SLIDES_SHOW_MOBILE) : [1];
                                placeholders = detectmob() ? createPlaceholders(_SLIDES_SHOW_MOBILE) : [1, 2, 3, 4];
                                source = $("#template-vitrine-impulse-historico").html();
                            } else {
                                switch (getPageType()) {
                                    /*
                                    case 'category':
                                        placeholders = detectmob() ? createPlaceholders(_SLIDES_SHOW_MOBILE) : [1, 2];
                                        source = $("#template-vitrine-impulse-category").html();
                                    break;
                                    */

                                    case 'cart':
                                        placeholders = detectmob() ? createPlaceholders(_SLIDES_SHOW_MOBILE) : [1, 2, 3];
                                        source = $("#template-vitrine-impulse").html();
                                    break;

                                    default:
                                        placeholders = detectmob() ? createPlaceholders(_SLIDES_SHOW_MOBILE) : [1, 2, 3, 4, 5];
                                        source = $("#template-vitrine-impulse").html();
                                    break;
                                }
                            }
                            const template = Handlebars.compile(source);
                            const html = template({
                                id,
                                title,
                                subtitle,
                                placeholderRef,
                                placeholders,
                                menu,
                                references,
                                recommendations,
                                impressionUrl,
                                feature: feature.toLowerCase(),
                                refreshReferenceUrl
                            });
                            $(`[data-impulse="${div}"]`).append(html);
                        });
                    }
                } catch (e) { console.log(e); }
            }

            const placeholderImpulseUnique = (response) => {
                try {
                    const { id, feature, title, subtitle, impressionUrl } = response;
                    let references = [];
                    let recommendations = [];
                    if (response.hasOwnProperty('displays')) {
                        if (response?.displays[0]?.references.length) {
                            references = response.displays[0].references;
                        }
                        recommendations = response.displays[0].recommendations;
                    }

                    let placeholderRef = [1],
                        placeholders = detectmob() ? [1] : [1, 2, 3, 4],
                        source,
                        menu,
                        refreshReferenceUrl;

                    const idx = window.showcases.findIndex(item => item.id == id);
                    window.showcases[idx] = {
                        id,
                        feature,
                        title,
                        references,
                        recommendations,
                        impressionUrl
                    };

                    if (['PurchasePersonalized', 'ViewPersonalized', 'UltimateBuy', 'CartPersonalized'].includes(feature)) {
                        placeholders = detectmob() ? [1] : [1, 2, 3, 4];
                        source = $("#template-vitrine-impulse-referencia").html();
                        refreshReferenceUrl = response.displays[0].refreshReferenceUrl;
                    } else if (['HistoryPersonalized'].includes(feature)) {
                        placeholders = detectmob() ? createPlaceholders(_SLIDES_SHOW_MOBILE) : [1, 2, 3, 4];
                        source = $("#template-vitrine-impulse-base").html();
                    } else if (['Push'].includes(feature)) {
                        source = $("#template-vitrine-impulse-single").html();
                    } else {
                        source = $("#template-vitrine-impulse").html();
                    }
                    const template = Handlebars.compile(source);
                    const html = template({
                        id,
                        title,
                        subtitle,
                        placeholderRef,
                        placeholders,
                        menu,
                        references,
                        recommendations,
                        impressionUrl,
                        feature: feature.toLowerCase(),
                        refreshReferenceUrl,
                        showWrapper: true,
                    });

                    if (['HistoryPersonalized'].includes(feature)) {
                        $('.others .wd-content .content', `[data-showcase-id="${id}"]`).html(html);
                    } else if (['Push'].includes(feature)) {
                        $('.wd-content .content', `[data-showcase-id="${id}"]`).html(html);
                    } else {
                        $(`[data-showcase-id="${id}"]`).html(html);
                    }
                    productListImpulse($(`[data-showcase-id="${id}"]:not(.lazy)`));
                } catch (e) {
                    console.log(e);
                }
            }

            const productListImpulse = (el) => {
                try {
                    const _mountShowCase = ({ el, showCase, products }) => {
                        $.ajax({
                            url: browsingContext.Common.Urls.BaseUrl + 'widget/product_list_by_id',
                            data: {
                                Products: products.map(p => p.id).join(';'),
                                WidgetBox: _WIDGETBOX,
                                PageSize: products.length,
                                //AlternativeTemplate: '/Templates/stz.new.layout/custom-widgets/product.line/product.line.2.0.template'
                            }
                        }).done(html => {
                            if (['PurchasePersonalized', 'ViewPersonalized', 'UltimateBuy', 'CartPersonalized'].includes(showCase.feature)) {
                                /**
                                 * popula produtos de referência
                                 */
                                $('.referer .wd-content .content', el).html(html);

                                /**
                                 * remove os demais produtos e deixa somente a referência
                                 */
                                $(`.referer .wd-content .content .wd-product-list-by-id .list li:not(.product-${showCase.references[0].id})`, el).remove();

                                /**
                                 * popula recomendações
                                 */
                                $('.others .wd-content .content', el).html(html);

                                /**
                                 * remove o primeiro produtos dos relacionados
                                 */
                                $(`.others .wd-content .content .wd-product-list-by-id .list li.product-${showCase.references[0].id}`, el).remove();

                                /**
                                 *  seta SkuID
                                 */
                                $('.wd-content .wd-product-list-by-id .list .wd-product-line', el).each((k, i) => {
                                    if ($('.wd-buy-button [name="Products[0].SkuID"]', i).val() == '') {

                                        const propertyPath = $('.variation-item:first', i).data('property-path');
                                        const skuOptions = $(i).data('sku-options');

                                        if (skuOptions != undefined) {

                                            const sku = skuOptions.SkuOptions.filter(function (options) {
                                                return options.propertyPaths.filter(function (option) {
                                                    return option.propertyPath == propertyPath;
                                                });
                                            })[0];
                                            $('.wd-buy-button [name="Products[0].SkuID"]', i).val(sku.skuID);
                                        }
                                    }
                                });

                                /**
                                 * popula infos adicionais (percente, age)
                                 */
                                showCase.recommendations.map(item => {
                                    let html = '';
                                    if (item.businessInfo) {
                                        const { percentage } = item.businessInfo;
                                        if (percentage) {
                                            html = `<div class="business-info percentage">${percentage}% compram</div>`;
                                        }
                                        $(`.others .wd-content .content .list li.product-${item.id} .wd-product-line`, el).prepend(html);
                                    }
                                });

                                setTimeout(() => {
                                    $('.wd-product-list-impulse .wd-widget-js').each((k, i) => {
                                        app.tools.widgetCaller(i);
                                    });

                                    /** 
                                     * @todo validação com base em parâmetro do widget ou class
                                     */
                                    const slidesToShow = detectmob() ? _SLIDES_SHOW_MOBILE : _SLIDES_SHOW_DESKTOP-1;
                                    const slidesToScroll = detectmob() ? _SLIDES_SCROLL_MOBILE : _SLIDES_SCROLL_DESKTOP-1;
                                    if ($('.others .wd-content .wd-product-list-by-id .list > li', el).length > slidesToShow) {
                                        $('.others .wd-content .wd-product-list-by-id .list', el).slick({
                                            slidesToShow,
                                            slidesToScroll,
                                            arrows: detectmob() ? _ARROWS_MOBILE : _ARROWS_DESKTOP,
                                            lazyLoad: 'ondemand',
                                            dots: true
                                        });
                                    }

                                    /**
                                     * registra evento e armazena origem do click 
                                     */
                                    $('.wd-product-line a[href*="-p"]', el).on('click', e => {
                                        const productLine = $(e.target).closest('.wd-product-line'),
                                            pid = productLine.data('product-id');

                                        const url = products.filter(item => {
                                            return item.id == pid
                                        })[0].trackingUrl;

                                        $.ajax({
                                            url
                                        });
                                    });
                                }, 100);
                            } else if (showCase.feature == 'HistoryPersonalized') {
                                const productsReferer = showCase.references.map(item => {
                                    return '.product-' + item.id;
                                }).join(',');

                                if (!$(el).hasClass('populated')) {
                                    $('.referer .wd-content .content', el).html(html);
                                    $(`.referer .wd-content .content .wd-product-list-by-id .list > li:not(${productsReferer})`, el).remove();
                                    showCase.references.map(item => {
                                        $(`.referer .wd-content .content .list li.product-${item.id} .wd-product-line`, el).attr('data-refresh', item.getRecommendationsUrl);
                                    });
                                }

                                $('.others .wd-content .content', el).html(html);
                                //$(`.others .wd-content .content .wd-product-list-by-id .list > li:is(${productsReferer})`, el).remove();
                                //$(`.others .wd-content .content .wd-product-list-by-id .list li.product-${showCase.references[0].id}`, el).remove();

                                /**
                                 *  seta SkuID
                                 */
                                $('.others .wd-content .wd-product-list-by-id .list .wd-product-line', el).each((k, i) => {
                                    if ($('.wd-buy-button [name="Products[0].SkuID"]', i).val() == '') {

                                        const propertyPath = $('.variation-item:first', i).data('property-path');
                                        const skuOptions = $(i).data('sku-options');

                                        if (skuOptions != undefined) {

                                            const sku = skuOptions.SkuOptions.filter(function (options) {
                                                return options.propertyPaths.filter(function (option) {
                                                    return option.propertyPath == propertyPath;
                                                });
                                            })[0];
                                            $('.wd-buy-button [name="Products[0].SkuID"]', i).val(sku.skuID);
                                        }
                                    }
                                });

                                $(el).addClass('populated');

                                setTimeout(() => {
                                    $('.wd-product-list-impulse .wd-widget-js').each((k, i) => {
                                        app.tools.widgetCaller(i);
                                    });

                                    /** 
                                     * @todo validação com base em parâmetro do widget ou class
                                     */
                                    const slidesToShowVertical = detectmob() ? 1 : _SLIDES_VERTICAL_DESKTOP;
                                    if ($('.referer .wd-content .wd-product-list-by-id .list > li', el).length > slidesToShowVertical) {
                                        $('.referer .wd-content .wd-product-list-by-id .list', el).slick({
                                            slidesToShow: slidesToShowVertical,
                                            slidesToScroll: 1,
                                            //arrows: detectmob() ? _ARROWS_MOBILE : _ARROWS_DESKTOP,
                                            arrows: true,
                                            vertical: true,
                                            infinite: false,
                                            lazyLoad: 'ondemand',
                                        });
                                    }

                                    const slidesToShow = detectmob() ? _SLIDES_SHOW_MOBILE : _SLIDES_SHOW_DESKTOP-1;
                                    const slidesToScroll = detectmob() ? _SLIDES_SCROLL_MOBILE : _SLIDES_SCROLL_DESKTOP;
                                    if ($('.others .wd-content .wd-product-list-by-id .list > li', el).length > slidesToShow) {
                                        $('.others .wd-content .wd-product-list-by-id .list', el).slick({
                                            slidesToShow,
                                            slidesToScroll,
                                            arrows: detectmob() ? _ARROWS_MOBILE : _ARROWS_DESKTOP,
                                            lazyLoad: 'ondemand',
                                            dots: true
                                        });
                                    }

                                    /**
                                     * registra evento e armazena origem do click 
                                     * @todo avaliar para deixar evento global
                                     */
                                    $('.wd-product-line a[href*="-p"]', el).on('click', e => {
                                        const productLine = $(e.target).closest('.wd-product-line'),
                                            pid = productLine.data('product-id');

                                        const url = products.filter(item => {
                                            return item.id == pid
                                        })[0].trackingUrl;

                                        $.ajax({
                                            url
                                        });
                                    });

                                    /**
                                     * 
                                     */
                                    $('.referer .wd-product-line[data-refresh]', el).on('click', e => {
                                        const productLine = e.currentTarget,
                                            parent = $(productLine).closest('li');
                                        $('.referer [class*="product-"].selected', el).removeClass('selected');
                                        $(parent).addClass('selected');
                                    });
                                }, 100);
                            } else {

                                $('.wd-content .content', el).html(html);

                                /**
                                 *  seta SkuID
                                 */
                                $('.wd-content .wd-product-list-by-id .list .wd-product-line', el).each((k, i) => {
                                    if ($('.wd-buy-button [name="Products[0].SkuID"]', i).val() == '') {

                                        const propertyPath = $('.variation-item:first', i).data('property-path');
                                        const skuOptions = $(i).data('sku-options');

                                        if (skuOptions != undefined) {

                                            const sku = skuOptions.SkuOptions.filter(function (options) {
                                                return options.propertyPaths.filter(function (option) {
                                                    return option.propertyPath == propertyPath;
                                                });
                                            })[0];
                                            $('.wd-buy-button [name="Products[0].SkuID"]', i).val(sku.skuID);
                                        }
                                    }
                                });

                                /**
                                 * popula infos adicionais (percente, age)
                                 */
                                showCase.recommendations.map(item => {
                                    let html = '';
                                    if (item.businessInfo) {
                                        const { age } = item.businessInfo;
                                        if (age) {
                                            html = `<div class="business-info age">${age} atrás</div>`;
                                        }
                                        //$(`.wd-content .content .list li.product-${item.id} .wd-product-line`, el).prepend(html);
                                    }
                                });

                                setTimeout(() => {
                                    $('.wd-product-list-impulse .wd-widget-js').each((k, i) => {
                                        app.tools.widgetCaller(i);
                                    });

                                    /** 
                                     * @todo validação com base em parâmetro do widget ou class
                                     */
                                    let 
                                        arrows = detectmob() ? _ARROWS_MOBILE : _ARROWS_DESKTOP,
                                        dots =  detectmob() ? _DOTS_MOBILE : _DOTS_DESKTOP,
                                        slidesToShow,
                                        slidesToScroll

                                    switch (getPageType()) {
                                        // case 'category':
                                        //     slidesToShow = detectmob() ? _SLIDES_SHOW_MOBILE : 2;
                                        //     slidesToScroll = detectmob() ? _SLIDES_SCROLL_MOBILE : 2;
                                        //     arrows = false
                                        //     dots = true
                                        // break;

                                        case 'cart':
                                            slidesToShow = detectmob() ? _SLIDES_SHOW_MOBILE : _SLIDES_SHOW_DESKTOP - 1;
                                            slidesToScroll = detectmob() ? _SLIDES_SCROLL_MOBILE : _SLIDES_SHOW_DESKTOP - 1;
                                            if (detectmob()) {
                                                arrows = false
                                                dots = true
                                            }
                                        break;

                                        default:
                                            slidesToShow = detectmob() ? _SLIDES_SHOW_MOBILE : _SLIDES_SHOW_DESKTOP;
                                            slidesToScroll = detectmob() ? _SLIDES_SCROLL_MOBILE : _SLIDES_SHOW_DESKTOP;
                                        break;
                                    }                                    
                                    
                                    if ($('.wd-content .wd-product-list-by-id .list > li', el).length > slidesToShow) {
                                        $('.wd-content .wd-product-list-by-id .list', el).slick({
                                            slidesToShow,
                                            slidesToScroll,
                                            arrows,
                                            dots,
                                            lazyLoad: 'ondemand',
                                        });
                                    }

                                    /**
                                     * registra evento e armazena origem do click 
                                     */
                                    $('.wd-product-line a[href*="-p"]', el).on('click', e => {
                                        const productLine = $(e.target).closest('.wd-product-line'),
                                            pid = productLine.data('product-id');

                                        const url = products.filter(item => {
                                            return item.id == pid
                                        })[0].trackingUrl;

                                        $.ajax({
                                            url
                                        });
                                    });
                                }, 100);
                            }

                            $.publish('showCase/impulse/rendered', { showCase })
                        });
                    };
                    const id = $(el).data('showcase-id');
                    var showCase = getShowCase(id);
                    const impressionUrl = showCase.impressionUrl;

                    let products;
                    switch (getPageType()) {
                        case 'cart':
                            products = showCase.recommendations;
                        break;

                        default:
                            products = [...showCase.references, ...showCase.recommendations];
                        break;
                    }
                    /*
                    let products = [];
                    items.forEach(item => {
                        products.push(item.id);
                    });
                    */

                    $.ajax({
                        url: impressionUrl
                    });

                    _mountShowCase({ el, products, showCase });

                } catch (e) { console.log(e); }
            };

            let lazyLoadThrottleTimeout;
            const lazyLoadImpulse = () => {
                const lazyLoadProductList = document.querySelectorAll(".wd-product-list-impulse.lazy");
                if (lazyLoadThrottleTimeout) {
                    clearTimeout(lazyLoadThrottleTimeout);
                }

                lazyLoadThrottleTimeout = setTimeout(function () {
                    var scrollTop = window.pageYOffset;
                    lazyLoadProductList.forEach(function (list) {
                        if (list.offsetTop < (window.innerHeight + scrollTop)) {
                            productListImpulse(list);
                            list.classList.remove('lazy');
                        }
                    });
                    if (lazyLoadProductList.length == 0) {
                        document.removeEventListener("scroll", lazyLoadImpulse);
                        window.removeEventListener("resize", lazyLoadImpulse);
                        window.removeEventListener("orientationChange", lazyLoadImpulse);
                    }
                }, 200);
            }

            const getByWidget = ({ url }) => {
                $.ajax({
                    url,
                    beforeSend: () => {
                    }
                }).done(response => {
                    placeholderImpulseUnique(response)
                })
            }

            function applyBinds() {
                $('body').on('click', `[data-impulse] [data-refresh]`, e => {
                    const el = e.currentTarget,
                        url = $(el).attr('data-refresh');
                    getByWidget({ url });
                });

                /**
                 * aplica binds
                 */
                $('body').on('click', `[data-impulse] .menu a`, e => {
                    const el = e.target,
                        menu = $(el).closest('.menu'),
                        tab = $(el).closest('li');

                    $('> li ', menu).removeClass('selected');
                    $(tab).addClass('selected');

                    const url = $(el).data('widget');
                    getByWidget({ url });
                });
            };
            applyBinds();

            const data = {
                name: getPageType(),
                apiKey: browsingContext.Common.Config.Platform.LinxImpulseByGroup.ApiKey,
                //secretKey: 'nDcNN1YIyTYNSjzgjo7tGQ==',
                source: detectmob() ? 'mobile' : 'desktop',
                deviceId: $.cookie('chaordic_browserId'),
                productFormat: 'onlyIds',
                dummy: _DUMMY,
                homologation: _HOMOLOGATION
            };

            switch (getPageType()) {
                case 'product':
                    data.productId = browsingContext.Page.Product.ProductID;
                break;

                case 'category':
                    data.categoryId = browsingContext.Page.Category.CategoryID;
                break;

                case 'cart':
                    data.productId = browsingContext.Common.Basket.Items.map(i => {
                        return i.ProductID
                    });
                break;
            }

            /*
            if (getPageType() == 'product') {
                data.productId = browsingContext.Page.Product.ProductID;
            }
            */

            $.ajax({
                url: `https://recs.chaordicsystems.com/v0/pages/recommendations`,
                data
            }).done(response => {
                placeholderImpulse('top', response);
                placeholderImpulse('middle', response);
                placeholderImpulse('bottom', response);

                lazyLoadImpulse();
                document.addEventListener("scroll", lazyLoadImpulse);
                window.addEventListener("resize", lazyLoadImpulse);
                window.addEventListener("orientationChange", lazyLoadImpulse);
            });
        //})
    } catch (e) {
        console.log('error wd.product.list.impulse', e);
    }

})();