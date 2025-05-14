const timelineData = [
  {
    id: '1',
    index: 1,
    label: 'наука',
    yearsInterval: { start: 2015, last: 2022 },
    details: [
      { year: 2015, description: 'Обнаружено гравитационное волновое излучение, подтверждающее теорию Эйнштейна.' },
      { year: 2016, description: 'Телескоп «Хаббл» зафиксировал самую удалённую галактику — GN-z11.' },
      { year: 2018, description: 'Solar Probe Plus отправлен к Солнцу для исследования солнечной короны.' },
      { year: 2019, description: 'Google анонсировал 53-кубитный квантовый компьютер.' },
    ],
  },
  {
    id: '2',
    index: 2,
    label: 'технологии',
    yearsInterval: { start: 1980, last: 1986 },
    details: [
      { year: 1980, description: 'Sinclair Research выпускает домашний компьютер ZX80.' },
      { year: 1982, description: 'Появился домашний компьютер ZX Spectrum.' },
      { year: 1983, description: 'Выпущен текстовый процессор Multi-Tool Word (будущий Microsoft Word).' },
      { year: 1986, description: 'IBM представляет первый портативный компьютер PC Convertible.' },
    ],
  },
  {
    id: '3',
    index: 3,
    label: 'мировые новости',
    yearsInterval: { start: 1989, last: 2001 },
    details: [
      { year: 1989, description: 'Падение Берлинской стены ознаменовало конец Холодной войны.' },
      { year: 1991, description: 'Распад СССР и образование СНГ.' },
      { year: 1997, description: 'Передача Гонконга от Великобритании Китаю.' },
      { year: 2001, description: '11 сентября — теракты в США.' },
    ],
  },
  {
    id: '4',
    index: 4,
    label: 'кино',
    yearsInterval: { start: 1987, last: 1991 },
    details: [
      { year: 1987, description: '«Хищник»/Predator, США (реж. Джон Мактиран).' },
      { year: 1989, description: '«Назад в будущее 2»/Back to the Future II, США.' },
      { year: 1991, description: '«Семейка Аддамс»/The Addams Family, США.' },
    ],
  },
  {
    id: '5',
    index: 5,
    label: 'искусство',
    yearsInterval: { start: 1999, last: 2004 },
    details: [
      { year: 1999, description: 'Премьера балета «Золушка» в постановке Жан-Кристофа Майо.' },
      { year: 2002, description: 'Премьера трилогии «Берег утопии» Тома Стоппарда в Лондоне.' },
      { year: 2003, description: 'Реставрация театра «Ла Фениче» в Венеции.' },
    ],
  },
  {
    id: '6',
    index: 6,
    label: 'литература',
    yearsInterval: { start: 1992, last: 1997 },
    details: [
      { year: 1992, description: 'Нобелевская премия по литературе — Дерек Уолкотт.' },
      { year: 1995, description: 'Нобелевская премия по литературе — Шеймас Хини.' },
      { year: 1997, description: 'Выход книги «Гарри Поттер и философский камень» Джоан Роулинг.' },
    ],
  },
];

export default timelineData;
