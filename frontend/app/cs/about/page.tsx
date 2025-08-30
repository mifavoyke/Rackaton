import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          O predikčním nástroji
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Účel</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
            Tento webový nástroj poskytuje personalizované odhady rizika recidivy rakoviny prsu pro pacientky v České republice. Je navržen jako podpora sdíleného rozhodování mezi lékařem a pacientkou a nabízí datově podložený pohled na prognózu v horizontu 1 až 10 let. Inspirovali jsme se britským nástrojem Predict Breast a vytvořili jeho lokalizovanou verzi pro české prostředí a dostupná data.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Metodologie</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
            Predikce jsou založeny na Coxově regresním modelu proporcionálních rizik, který je běžně používán v analýze přežití. Model jsme natrénovali na reálných datech z Národního onkologického registru (NOR) a Národního registru hrazených zdravotních služeb (NRHZS).

Zahrnuli jsme klíčové klinické ukazatele, které ovlivňují prognózu:
<b>
<ul className="list-disc pl-6 mt-2 space-y-2">
<li>
Velikost nádoru a klinické stadium (TNM klasifikace)
</li>
<li>
Histologický grading
</li>
<li>
Typ následné léčby (chemoterapie, radioterapie, cílená léčba)
</li>
<li>
Demografické údaje pacientky (věk v době diagnózy, lateralita)
</li>
<li>
Časové intervaly mezi diagnózou a zahájením léčby
</li>
</ul>
</b>
Model se učí z tisíců anonymizovaných záznamů, jak různé kombinace těchto faktorů ovlivňují čas do recidivy. Po natrénování pak dokáže odhadnout individuální funkci přežití, tedy pravděpodobnost, že pacientka zůstane bez recidivy každý následující rok po diagnóze.

V případě chybějících údajů o léčbě předpokládáme, že pacientka je zdravá a nebyla léčena. U pacientek bez recidivy odhadujeme dobu sledování jako rozdíl mezi rokem diagnózy a současností. Tyto předpoklady nám umožňují zpracovat cenzorovaná data, která jsou klíčová pro správné fungování Coxova modelu, a zároveň minimalizují ztráty dat.
            </p>
            <p className="mt-4">
              Model byl validován pomocí nezávislých datových souborů pro zajištění přesnosti a spolehlivosti.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Omezení</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              I když tento nástroj poskytuje cenné informace pro klinické rozhodování, má několik omezení:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Predikce jsou založeny na populačních datech a nemusí zohledňovat všechny individuální variace
              </li>
              <li>
                Nástroj by měl být používán jako doplněk, nikoli náhrada, klinického úsudku
              </li>
              <li>
                Přesnost se může lišit v závislosti na úplnosti a přesnosti vstupních dat
              </li>
              <li>
                Model nemusí zohledňovat všechny potenciální prognostické faktory
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tento nástroj byl vyvinut na základě výzkumu a metodik z následujících zdrojů:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
              Ústav zdravotnických informací a statistiky ČR (ÚZIS)
              </li>
              <li>
              Czech National Cancer Registry (NOR)
              </li>
              <li>
                PREDICT: nový britský prognostický model, který předpovídá recidivism po operaci invazivního karcinomu prsu
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}