import React from "react";
import { useComponent } from "./hook";
import { Loader } from "../../components/Loader";
import { Cat } from "../../components/Cat";

export function CatsListPage() {
  const { loading, cats } = useComponent();

  if (loading) {
    return <Loader />;
  } else if (!cats.length) {
    return <div>You have no cats images</div>;
  } else
    return (
      <div className='cats-container'>
        {cats.map((image, i) => (
          <Cat key={image.id} catImage={image} />
        ))}
      </div>
    );
}
