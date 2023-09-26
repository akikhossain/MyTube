const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();

  const tabContainer = document.getElementById("tab-container");
  const trimData = data.data;
  trimData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<a onclick= "handleLoadData('${category.category_id}')"
    ><button
      class="btn btn-active hover:bg-rose-600 hover:text-white lg:px-5 py-2 rounded-md"
    >
      ${category.category}
    </button></a
  >
    `;

    tabContainer.appendChild(div);
  });
};

const handleLoadData = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (data.data?.length === 0) {
    const noDataDiv = document.createElement("div");
    noDataDiv.innerHTML = `
      <div class="caution-message text-center flex flex-col justify-center items-center lg:h-[500px] lg:w-[1440px] md:h-[500px] md:w-[800px] ">
        <img src="icon.png" alt="Caution" class="caution-icon">
        <p class ="mt-8 font-bold text-3xl">Oops!! Sorry, There is no content here</p>
      </div>`;
    cardContainer.appendChild(noDataDiv);
  } else {
    data?.data?.forEach((element) => {
      const div = document.createElement("div");

      const convertSeconds = element?.others?.posted_date
        ? parseInt(element?.others?.posted_date)
        : 0;
      const convertHours = Math.floor(convertSeconds / 3600);
      const convertMinutes = Math.floor((convertSeconds % 3600) / 60);

      div.innerHTML = `<div class="card bg-base-100 relative shadow-sm">
      <figure>
      <img  class="w-[312px] h-[200px] shrink-0 rounded-md"
        src= ${element?.thumbnail}
      />
    </figure>
    <div>
    <p
      class="p-1 absolute left-[60%] top-[45%]  bg-black text-white inline-flex justify-center items-center rounded-md"
    >
    ${convertHours ? convertHours : "0"}hrs ${
        convertMinutes ? convertMinutes : "0"
      }min
    </p>
  </div>
    <div class="card-body">
  <div class="flex gap-3 mt-2">
    <div>
      <img class="w-[40px] h-[40px] rounded-full" src="${
        element?.authors[0]?.profile_picture
      }" alt="Profile Picture">
    </div>
    <div class="flex flex-col"> <!-- Add a flex container for vertical alignment -->
      <h2 class="card-title">${element?.title}</h2>
      <div class="flex">
        <p class="grow-0 m-0">${element?.authors[0]?.profile_name}</p>
        ${
          element?.authors[0]?.verified
            ? '<img src="verification.png" alt="Verified" class="verified-icon ml-1">'
            : ""
        }
      </div>
      <p>${element?.others?.views} views</p>
    </div>
  </div>
</div>

      </div>`;

      cardContainer.appendChild(div);
    });
  }
};

handleCategory();
handleLoadData("1000");
