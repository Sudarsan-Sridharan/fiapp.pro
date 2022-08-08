function resetApp() {
  caches.keys().then(function (names) {
    for (const name of names)
      caches.delete(name);
  });

  return window.location.reload();
}

export default resetApp;
