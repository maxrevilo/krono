export default function(){
  this.transition(
    this.fromRoute('ordering'),
    this.toRoute('order'),
    this.use('toLeft', { duration: 500, })
    // this.reverse('toRight', { duration: 500, })
  );
};
