/* Инициализация TimelineJS3 для шкалы «Текст как данные».
   Данные: data/timeline.json. Библиотека: CDN Knight Lab, версия 3.9.12. */
(function () {
  "use strict";

  var CONTAINER = "timeline-embed";
  /* Версия данных в адресе. Браузер и CDN GitHub Pages кешируют
     data/timeline.json надолго, и после правки читатель видел бы старую шкалу.
     Меняйте дату при каждом обновлении данных. */
  var DATA_VERSION = "2026-10-04b";
  var DATA_URL = "data/timeline.json?v=" + DATA_VERSION;

  var options = {
    language: "ru",

    /* Адрес вида #event-markov-1916 у каждой карточки.
       Библиотека сама слушает hashchange и переходит к событию,
       поэтому ссылки «метод — критика» внутри карточек работают. */
    hash_bookmark: true,

    timenav_position: "bottom",

    /* Индекс в zoom_sequence [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89].
       3 — лента втрое шире окна: 2010-е расходятся, вся шкала ещё обозрима. */
    initial_zoom: 3,
    optimal_tick_width: 100,

    /* Высота ленты: трём дорожкам нужно больше места, чем по умолчанию (25%). */
    timenav_height_percentage: 42,
    timenav_mobile_height_percentage: 42,
    marker_height_min: 28,
    marker_width_min: 110,

    start_at_slide: 0,
    duration: 600
  };

  function showError(message) {
    var el = document.getElementById(CONTAINER);
    if (!el) return;
    el.innerHTML =
      '<div class="tl-fallback"><p><b>Шкалу не удалось загрузить.</b></p>' +
      "<p>" + message + "</p>" +
      "<p>Если страница открыта как локальный файл, браузер не даёт прочитать " +
      "<code>data/timeline.json</code>. Запустите локальный сервер: " +
      "<code>python -m http.server 8000</code> — и откройте " +
      "<code>http://localhost:8000/</code>.</p></div>";
  }

  if (typeof TL === "undefined" || !TL.Timeline) {
    showError("Библиотека TimelineJS не загрузилась с CDN.");
    return;
  }

  try {
    window.timeline = new TL.Timeline(CONTAINER, DATA_URL, options);
  } catch (e) {
    showError("Ошибка инициализации: " + (e && e.message ? e.message : e));
  }
})();
