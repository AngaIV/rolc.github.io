function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',   //site’s default language
      includedLanguages: 'en,es,fr,de,zh,af',
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
    },
    'google_translate_element'
  );
}
