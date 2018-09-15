<template>
  <div>
    <h2>Kyllian</h2>

<table>
    <tr>
        <th></th>
        <th>Lundi</th>
        <th>Mardi</th>
        <th>Mercredi</th>
        <th>Jeudi</th>
        <th>Vendredi</th>
    </tr>
    <tr>
        <!-- <td class="hour">8h30</td> -->
        <!-- <td><span class="room"> 205</span> Anglais<br> groupe 1  <span class="prof">Mme.TEXIER</span> </td> -->
        <th>8h30</th>
        <td>Anglais groupe 1 Mme.TEXIER salle 205 </td>
        <td>Mathématiques M.DORNEAU salle BA1</td>
        <td>Anglais groupe1 Mme.TEXIER salle 205</td>
        <td></td>
        <td>Anglais groupe1 Mme.TEXIER salle 205</td>
    </tr>
    <tr>
        <th>9h25</th>
        <td>Mathématiques M.DORNEAU salle BA1</td>
        <td>Hist.Géo.Mor. et Civ.M.BONIN VOIROL</td>
        <td>Hist.Géo.Mor. et Civ.M.BONIN VOIROL</td>
        <td>Anglais groupe1 Mme.TEXIER salle 205</td>
        <td>Technologie Mme.GUGLIELMETTI salle002</td>
    </tr>
    <tr>
        <th>10h40</th>
        <td>Hist.Géo.Mor. et Civ.M.BONIN VOIROL</td>
        <td>Français Mme.ABDILLAH salle 013</td>
        <td>S.V.T. M.BELANGER salle 011</td>
    </tr>
</table>


  </div>
</template>

<script>

</script>

<style scoped>
table {
    border-collapse: collapse;
    border: 1px solid black;
    width: 100%;
}
th {
  background: darkred;
  color: white;
}
th, td {
    border: 1px solid black;
    padding: 8px;
}

td.hour {
  background: darkgreen;
  color: white;
}
td span.room {
    display: block;
    color: blueviolet;
    text-align: right;
    font-size: .75em;
}
td span.prof {
    display: block;
    color: cadetblue;
    font-size: .75em;
}
</style>
