const categoriesUrl = 'assets/js/categories.json';
    let categories = [];
    let products = [];
    let currentCategory = '';
    let currentPage = 1;
    const pageSize = 16;

    // Fetch categories and initialize the page
    fetch(categoriesUrl)
      .then(response => response.json())
      .then(data => {
        categories = data;
        renderCategories();
        if (categories.length > 0) {
          const firstCategoryId = categories[0].id;
          const firstCategoryName = categories[0].name;
          const firstCategoryProductsUrl = 'assets/js/product/' + firstCategoryId + '.json';
          currentCategory = firstCategoryId;
          loadProducts(firstCategoryProductsUrl);
          document.getElementById('category-title').textContent = firstCategoryName;
        }
      })
      .catch(error => console.error('Error fetching categories:', error));

    // Render category list
    function renderCategories() {
      const categoryList = document.querySelector('.category-list');
      categoryList.innerHTML = '';

    //   const allCategoryLink = createCategoryLink('All', '', 'All Products');
    //   categoryList.appendChild(allCategoryLink);

      categories.forEach(category => {
        const categoryLink = createCategoryLink(category.name, category.id, category.name);
        categoryList.appendChild(categoryLink);
      });
    }

    // Create a category link
    function createCategoryLink(text, categoryId, categoryName) {
      const productsUrl = 'assets/js/product/'+categoryId+'.json';
      const categoryLink = document.createElement('a');
      categoryLink.href = '#';
      categoryLink.textContent = text;
      categoryLink.classList.add('list-group-item', 'list-group-item-action');
      categoryLink.addEventListener('click', () => {
        currentCategory = categoryId;
        loadProducts(productsUrl);
        document.getElementById('category-title').textContent = categoryName;
      });
      return categoryLink;
    }

    // Load product list
    function loadProducts(productsUrl) {
      fetch(productsUrl)
        .then(response => response.json())
        .then(data => {
          products = data;
          currentPage = 1; // Reset to first page when loading new products
          renderProducts();
          renderPagination();
        })
        .catch(error => console.error('Error fetching products:', error));
    }

    // Render product list
    function renderProducts() {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';

      const productIds = Object.keys(products);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentProductIds = productIds.slice(startIndex, endIndex);

      currentProductIds.forEach((productId, index) => {
        if (index % 4 === 0) {
          const row = document.createElement('div');
          row.classList.add('row', 'mb-3');
          productList.appendChild(row);
        }

        const col = document.createElement('div');
        col.classList.add('col-md-3', 'mb-3');

        const card = createProductCard(products[productId]);
        col.appendChild(card);
        productList.lastElementChild.appendChild(col);
      });
    }

    // Create a product card
    function createProductCard(product) {
      const cardLink = document.createElement('a');
      cardLink.href = '/product.html?productId='+product.id+'&categoryId='+currentCategory;
      cardLink.classList.add('card', 'h-100');

      const img = document.createElement('img');
      img.src = product.mainImageURL;
      img.classList.add('card-img-top');
      img.alt = product.name;

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const title = document.createElement('h6');
      title.textContent = product.name;
      title.classList.add('card-title');
      title.title = product.name; // 添加 title 属性

      priceRange = `$${product.priceMin} - $${product.priceMax}`
      const price = document.createElement('p');
      price.textContent = `${priceRange}`;
      price.classList.add('card-text', 'price-red');

      const moq = document.createElement('p');
      moq.textContent = `MOQ: ${product.MOQ}`;
      moq.classList.add('card-text');

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      cardBody.appendChild(moq);

      cardLink.appendChild(img);
      cardLink.appendChild(cardBody);

      return cardLink;
    }

 // Render pagination
function renderPagination() {
  renderPaginationComponent('pagination-top');
  renderPaginationComponent('pagination-bottom');
}

// Render pagination component
function renderPaginationComponent(paginationId) {
  const pagination = document.getElementById(paginationId);
  pagination.innerHTML = '';

  const totalPages = Math.ceil(Object.keys(products).length / pageSize);

  const prevLink = createPaginationLink('Previous', currentPage > 1, () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      renderPagination(); // 重新渲染分页
    }
  });
  pagination.appendChild(prevLink);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = createPaginationLink(i, i !== currentPage, () => {
      currentPage = i;
      renderProducts();
      renderPagination(); // 重新渲染分页
    });
    if (i === currentPage) {
      pageLink.classList.add('active');
    }
    pagination.appendChild(pageLink);
  }

  const nextLink = createPaginationLink('Next', currentPage < totalPages, () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
      renderPagination(); // 重新渲染分页
    }
  });
  pagination.appendChild(nextLink);
}

